import clsx from "clsx";

export default function Button({

children,

type="button",

variant="primary",

size="md",

loading=false,

disabled=false,

icon:Icon,

className="",

...props

}){

const variants={

primary:
"bg-blue-600 hover:bg-blue-700 text-white",

secondary:
"bg-slate-900 hover:bg-slate-800 text-white",

success:
"bg-green-600 hover:bg-green-700 text-white",

danger:
"bg-red-600 hover:bg-red-700 text-white",

outline:
"border border-slate-300 bg-white hover:bg-slate-50",

ghost:
"hover:bg-slate-100"

};

const sizes={

sm:"px-3 py-2 text-sm",

md:"px-5 py-3",

lg:"px-7 py-4 text-lg"

};

return(

<button

type={type}

disabled={disabled||loading}

className={clsx(

"inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all",

"shadow-sm",

variants[variant],

sizes[size],

className

)}

{...props}

>

{loading && (

<div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>

)}

{!loading && Icon && <Icon size={18}/>}

<span>{children}</span>

</button>

);

}