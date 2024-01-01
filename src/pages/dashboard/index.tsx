import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Suspense, lazy, useEffect, useState } from "react";
import { LoadingIndicator } from "../../common/LoadingIndicator";

const PieChart = lazy(() => import("../../components/charts/pie-chart"));
const BarChart = lazy(() => import("../../components/charts/bar-chart"));

// Function to generate random number
function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const apiEndpoint =
  "https://api.worldbank.org/v2/country/bd/indicator/SP.POP.TOTL";

async function fetchDataForYear(year: string): Promise<Population | undefined> {
  try {
    const url = new URL(apiEndpoint);
    url.searchParams.append("date", year);
    url.searchParams.append("format", "json");

    const response = await fetch(url);
    const data = await response.json();

    // Process the data as needed
    // console.log(`Year ${year}:`, data);
    return data?.[1]?.[0];
  } catch (error) {
    return;
  }
}

async function fetchDataForYears(
  startYear: number,
  endYear: number
): Promise<Population[]> {
  const data: Population[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const result = await fetchDataForYear(year?.toString());
    if (result) {
      data.push(result);
    }
  }
  return data;
}

export default function DashboardPage() {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [from, setFrom] = useState<number>();
  const [to, setTo] = useState<number>();

  const handleFilter = async () => {
    if (from && to) {
      setLoading(true);
      const data = await fetchDataForYears(from, to);

      const labels = data?.map((it) => it.date);
      const chartData = data?.map((it) => it.value);

      setData(chartData);
      setLabels(labels);
      setLoading(false);
    }
  };

  const loadData = async () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const data = await fetchDataForYears(startYear, currentYear);

    const labels = data?.map((it) => it.date);
    const chartData = data?.map((it) => it.value);

    setData(chartData);
    setLabels(labels);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const fetchUserData = async () => {
    if (loading) return;
    const currentYear = new Date().getFullYear();
    const year = randomNumber(1971, currentYear - 10);

    const data = await fetchDataForYears(year, year + 10);

    const labels = data?.map((it) => it.date);
    const chartData = data?.map((it) => it.value);

    setData(chartData);
    setLabels(labels);
    setLoading(false);
  };

  useEffect(() => {
    // Fetch data initially
    fetchUserData();

    // Fetch data every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchUserData, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <Grid gap={3} rowGap={3} columnGap={3} container>
      <Grid item md={12} lg={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display={"flex"} gap={2} justifyContent={"end"} margin={0}>
            <DatePicker
              label={"From Year"}
              views={["year"]}
              onChange={(value) => setFrom(dayjs(+value!).year())}
            />
            <DatePicker
              label={"To Year"}
              views={["year"]}
              onChange={(value) => setTo(dayjs(+value!).year())}
            />
            <Button variant="contained" onClick={handleFilter}>
              Filter
            </Button>
          </Box>
        </LocalizationProvider>
      </Grid>

      <Grid item xs>
        <Card sx={{ minHeight: 275 }}>
          <CardContent>
            <Box>
              <Suspense fallback={<LoadingIndicator />}>
                {loading ? (
                  <LoadingIndicator />
                ) : (
                  <PieChart labels={labels} data={data} />
                )}
              </Suspense>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs>
        <Card sx={{ minHeight: 275 }}>
          <CardContent>
            <Box>
              <Suspense fallback={<LoadingIndicator />}>
                {loading ? (
                  <LoadingIndicator />
                ) : (
                  <BarChart labels={labels} data={data} />
                )}
              </Suspense>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
