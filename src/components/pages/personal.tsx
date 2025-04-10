import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank, Receipt, CreditCard } from 'lucide-react';

const expenseData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 42000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 44000 },
  { month: 'May', amount: 47000 },
  { month: 'Jun', amount: 43000 },
];

const expenseCategories = [
  { name: 'Housing', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Food', value: 20, color: 'hsl(var(--destructive))' },
  { name: 'Transport', value: 15, color: 'hsl(var(--accent))' },
  { name: 'Entertainment', value: 10, color: 'hsl(var(--secondary))' },
  { name: 'Shopping', value: 12, color: 'hsl(var(--muted))' },
  { name: 'Others', value: 8, color: 'hsl(var(--card))' },
];

const recentTransactions = [
  { id: 1, description: 'Grocery Shopping', amount: -2500, date: '2024-03-15', category: 'Food' },
  { id: 2, description: 'Salary Deposit', amount: 85000, date: '2024-03-01', category: 'Income' },
  { id: 3, description: 'Electricity Bill', amount: -3200, date: '2024-03-10', category: 'Utilities' },
  { id: 4, description: 'Freelance Payment', amount: 15000, date: '2024-03-08', category: 'Income' },
  { id: 5, description: 'Restaurant Dinner', amount: -1800, date: '2024-03-14', category: 'Food' },
];

export function Personal() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Personal Finance</h2>
{/*         <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹85,000</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹43,000</div>
            <div className="flex items-center space-x-2 text-sm text-red-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>-2.4% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹42,000</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">785</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+15 points</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="goals">Financial Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Expense Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={expenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-2 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date} • {transaction.category}
                        </p>
                      </div>
                      <span
                        className={
                          transaction.amount > 0
                            ? 'text-green-500 font-medium'
                            : 'text-red-500 font-medium'
                        }
                      >
                        {transaction.amount > 0 ? '+' : ''}₹
                        {Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Expense</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="Enter expense description" />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input placeholder="Select category" />
                  </div>
                  <Button className="w-full">Add Expense</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.name}</span>
                      <span className="font-medium">₹{(category.value * 1000).toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${category.value}%` }}
                      />
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4">Update Budget</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Savings Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Emergency Fund</h3>
                      <span className="text-sm text-green-500">60% Complete</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: '60%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Target: ₹3,00,000 • Saved: ₹1,80,000
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">New Car</h3>
                      <span className="text-sm text-green-500">35% Complete</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: '35%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Target: ₹8,00,000 • Saved: ₹2,80,000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add New Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Goal Name</Label>
                    <Input placeholder="Enter goal name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Amount</Label>
                    <Input type="number" placeholder="Enter target amount" />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Date</Label>
                    <Input type="date" />
                  </div>
                  <Button className="w-full">Create Goal</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
