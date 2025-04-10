import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Building2, Briefcase, PiggyBank, LineChart as ChartIcon } from 'lucide-react';

const stocks = [
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'UNH', name: 'UnitedHealth Group Incorporated' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'META', name: 'Meta Platforms, Inc.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
];

const portfolio = [
  { name: 'Stocks', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Mutual Funds', value: 30, color: 'hsl(var(--destructive))' },
  { name: 'Real Estate', value: 15, color: 'hsl(var(--accent))' },
  { name: 'Crypto', value: 10, color: 'hsl(var(--secondary))' },
];

const realEstate = [
  {
    property: 'Luxury Apartment',
    location: 'Mumbai Central',
    value: 15000000,
    appreciation: 12.5,
  },
  {
    property: 'Commercial Space',
    location: 'Bangalore Tech Park',
    value: 25000000,
    appreciation: 8.2,
  },
];









export function Wealth() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStock, setSelectedStock] = useState('MSFT');
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.marketstack.com/v1/eod?access_key=ec340342004d65b14f2280f40bec044b&symbols=${selectedStock}&limit=100`
        );
        const data = await response.json();
        const formattedData = data.data.map(item => ({
          date: new Date(item.date).toLocaleDateString(),
          price: item.close,
          volume: item.volume,
        })).reverse();
        setStockData(formattedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
      setLoading(false);
    };

    fetchStockData();
  }, [selectedStock]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Wealth Monitor</h2>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" /> Portfolio Analysis
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,25,00,000</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+15.2% this year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Returns</CardTitle>
            <ChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,50,000</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+22.5% this year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Real Estate Value</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,00,00,000</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+8.5% this year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Dividends</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹25,000</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+5.8% this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stock Tracker</TabsTrigger>
          <TabsTrigger value="realestate">Real Estate</TabsTrigger>
          <TabsTrigger value="analysis">Investment Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolio}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {portfolio.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Asset Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolio.map((asset) => (
                    <div key={asset.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{asset.name}</span>
                        <span className="font-medium">{asset.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${asset.value}%`, backgroundColor: asset.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Stock Performance</CardTitle>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select a stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {stocks.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.name} ({stock.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p>Loading stock data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockData}>
                      {/* <CartesianGrid strokeDasharray="0 0" /> */}
                      <XAxis
                        dataKey="date"
                        tickFormatter={(function() { // Wrap in an IIFE
                          const tickFormatter = (value) => {
                            if (!value) return '';
                            //const date = new Date(value);
                            const month = value.split('/')[1];
                            const year = value.split('/')[2];
                            const monthNames = [
                              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ];
                            const monthName = monthNames[month-1];
                            const key = `${year}-${monthName}`;
                            if (key !== (tickFormatter.lastMonth || null)) {
                              tickFormatter.lastMonth = key;
                              return monthName;
                            } else {
                              return '';
                            }
                          };
                          tickFormatter.lastMonth = null; // Initialize within the IIFE
                          return tickFormatter;
                        })()} // Immediately invoke the IIFE
                      />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip
                        formatter={(value) => [`$${value}`, 'Price']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realestate" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {realEstate.map((property) => (
              <Card key={property.property}>
                <CardHeader>
                  <CardTitle>{property.property}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span>{property.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Value</span>
                      <span className="font-medium">₹{property.value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Annual Appreciation</span>
                      <span className="text-green-500">+{property.appreciation}%</span>
                    </div>
                    <Button className="w-full" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <CardTitle>Add Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Property Name</Label>
                    <Input placeholder="Enter property name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Enter location" />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Value</Label>
                    <Input type="number" placeholder="Enter value" />
                  </div>
                  <Button className="w-full">Add Property</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Investment Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Return on Investment</h3>
                      <span className="text-green-500">18.5%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Annual return across all investments
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Risk Assessment</h3>
                      <span className="text-yellow-500">Moderate</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on portfolio diversity and market volatility
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Portfolio Beta</h3>
                      <span>1.2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Market sensitivity indicator
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-green-500">Diversification Opportunity</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider increasing exposure to international markets
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-blue-500">Tax Optimization</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Review tax-saving investment options
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium text-yellow-500">Risk Management</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider hedging strategies for market volatility
                    </p>
                  </div>
                  <Button className="w-full">Generate Detailed Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}