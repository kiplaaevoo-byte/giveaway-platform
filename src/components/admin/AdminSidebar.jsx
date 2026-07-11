import {
  LayoutDashboard,
  Gift,
  Users,
  Ticket,
  Trophy,
  Bell,
  BarChart3,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";


export default function AdminSidebar(){


const links=[

{
name:"Dashboard",
path:"/admin",
icon:LayoutDashboard
},

{
name:"Giveaways",
path:"/admin/giveaways",
icon:Gift
},

{
name:"Entries",
path:"/admin/entries",
icon:Ticket
},

{
name:"Users",
path:"/admin/users",
icon:Users
},

{
name:"Winners",
path:"/admin/winners",
icon:Trophy
},

{
name:"Notifications",
path:"/admin/notifications",
icon:Bell
},

{
name:"Reports",
path:"/admin/reports",
icon:BarChart3
},

{
name:"Settings",
path:"/admin/settings",
icon:Settings
}

];





return (

<div className="admin-sidebar w-72 min-h-screen p-6 shadow-xl">


<h1 className="text-2xl font-bold mb-8">

🎁 Giveaway Admin

</h1>





<nav className="space-y-2">


{
links.map(item=>{


const Icon=item.icon;


return (

<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

`

flex items-center gap-3 px-4 py-3 rounded-lg transition

${

isActive

?

"bg-blue-600"

:

"hover:bg-slate-800"

}

`

}

>


<Icon size={20}/>


<span>

{item.name}

</span>


</NavLink>

)


})

}



</nav>



</div>

);


}