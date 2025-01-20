import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
  import { Badge } from "../ui/badge"
  
  interface Order {
    id: number
    assignedName: string
    assignedRole: string
    name: string
    priority: 'Low' | 'Medium' | 'High' | 'Critical'
    budget: string
  }
  
  const orders: Order[] = [
    {
      id: 1,
      assignedName: "Sunil Joshi",
      assignedRole: "Web Designer",
      name: "Elite Admin",
      priority: "Low",
      budget: "$3.9k"
    },
    {
      id: 2,
      assignedName: "Andrew McDownland",
      assignedRole: "Project Manager",
      name: "Real Homes WP Theme",
      priority: "Medium",
      budget: "$24.5k"
    },
    {
      id: 3,
      assignedName: "Christopher Jamil",
      assignedRole: "Project Manager",
      name: "MedicalPro WP Theme",
      priority: "High",
      budget: "$12.8k"
    },
    {
      id: 4,
      assignedName: "Nirav Joshi",
      assignedRole: "Frontend Engineer",
      name: "Hosting Press HTML",
      priority: "Critical",
      budget: "$2.4k"
    }
  ]
  
  const getPriorityColor = (priority: Order['priority']) => {
    const colors = {
      Low: "bg-blue-100 text-blue-500",
      Medium: "bg-sky-100 text-sky-500",
      High: "bg-orange-100 text-orange-500",
      Critical: "bg-emerald-100 text-emerald-500"
    }
    return colors[priority]
  }
  
  export function OrderList() {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.assignedName}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.assignedRole}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={getPriorityColor(order.priority)}
                    >
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.budget}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  
  