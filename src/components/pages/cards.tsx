import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Bell,
  Wallet,
  Receipt,
  AlertCircle,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const spendingData = [
  { month: 'Jan', amount: 25000 },
  { month: 'Feb', amount: 28000 },
  { month: 'Mar', amount: 22000 },
  { month: 'Apr', amount: 30000 },
  { month: 'May', amount: 27000 },
  { month: 'Jun', amount: 32000 },
];

const cards = [
  {
    id: 1,
    type: 'Credit Card',
    name: 'Premium Rewards',
    number: '•••• •••• •••• 4242',
    expiry: '12/25',
    bank: 'HDFC Bank',
    limit: 200000,
    used: 45000,
    rewards: 2500,
  },
  {
    id: 2,
    type: 'Debit Card',
    name: 'Platinum Debit',
    number: '•••• •••• •••• 8453',
    expiry: '09/26',
    bank: 'ICICI Bank',
    balance: 85000,
    rewards: 1200,
  },
];

const transactions = [
  {
    id: 1,
    description: 'Amazon Shopping',
    amount: -15000,
    date: '2024-03-15',
    card: '4242',
    category: 'Shopping',
  },
  {
    id: 2,
    description: 'Restaurant Payment',
    amount: -3500,
    date: '2024-03-14',
    card: '8453',
    category: 'Dining',
  },
  {
    id: 3,
    description: 'Movie Tickets',
    amount: -1200,
    date: '2024-03-13',
    card: '4242',
    category: 'Entertainment',
  },
  {
    id: 4,
    description: 'Fuel Payment',
    amount: -4500,
    date: '2024-03-12',
    card: '8453',
    category: 'Transport',
  },
  {
    id: 5,
    description: 'Grocery Store',
    amount: -8500,
    date: '2024-03-11',
    card: '4242',
    category: 'Groceries',
  },
];

export function Cards() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Cards & Transactions</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Card
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credit Limit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,00,000</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>22.5% utilized</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹32,000</div>
            <div className="flex items-center space-x-2 text-sm text-red-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>+18.5% this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Points</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,700</div>
            <div className="flex items-center space-x-2 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>Worth ₹3,700</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>All cards secure</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Cards Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{card.name}</span>
                    <span className="text-sm text-muted-foreground">{card.type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <CreditCard className="h-8 w-8" />
                          <span>{card.bank}</span>
                        </div>
                        <div className="text-xl font-mono">{card.number}</div>
                        <div className="flex justify-between text-sm">
                          <span>Valid Thru: {card.expiry}</span>
                          {card.type === 'Credit Card' ? (
                            <span>Limit: ₹{card.limit.toLocaleString()}</span>
                          ) : (
                            <span>Balance: ₹{card.balance.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {card.type === 'Credit Card' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Credit Utilized</span>
                          <span>₹{card.used.toLocaleString()}</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(card.used / card.limit) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Report Issue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Spending Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingData}>
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
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-2 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date} • Card ending {transaction.card}
                        </p>
                      </div>
                      <span className="text-red-500 font-medium">
                        ₹{Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rewards Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cards.map((card) => (
                    <div key={card.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{card.name}</h3>
                        <span className="text-sm text-primary">{card.rewards} points</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Worth ₹{card.rewards.toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <Button className="w-full">Redeem Rewards</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Offers & Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">10% Cashback on Dining</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Valid until March 31, 2024
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">5X Rewards on Shopping</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Min. transaction ₹2,000
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Airport Lounge Access</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      4 complimentary visits per quarter
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>International Transactions</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable transactions outside India
                      </p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transaction Limits</Label>
                      <p className="text-sm text-muted-foreground">
                        Set daily spending limits
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Card Lock</Label>
                      <p className="text-sm text-muted-foreground">
                        Temporarily lock your cards
                      </p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transaction Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified for all transactions
                      </p>
                    </div>
                    <Button variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Alert Threshold</Label>
                    <Input type="number" placeholder="Enter amount" />
                    <p className="text-sm text-muted-foreground">
                      Get alerts for transactions above this amount
                    </p>
                  </div>
                  <Button className="w-full">Update Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}