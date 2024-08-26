import { Link} from "react-router-dom"
import { Avatar } from "./Avatar"
import { Editbutton } from "./Editbutton"

interface Blogprops {
    Authorname:string,
    publisedDate:string,
    title:string,
    content:string,
    id:string,
    edit?:boolean,
}


export const Blogcomponent = ({Authorname,publisedDate,title,content,id,edit}:Blogprops)=>{
    
    return (
        <div>
            <Link to={`/read/${id}`}>
        <div className="border-solid border-b-2 border-gray-200 cursor-pointer">
            <div className="flex justify-between">
                <div className="flex">
                <div className="flex justify-center mt-2.5">
                <Avatar size={10} pad={2} Authorname={Authorname}></Avatar>
                </div>
                <div className="ml-1 text-lg font-normal flex justify-center flex-col mt-2">{Authorname}</div>
                <div className="flex flex-col justify-center p-1 mt-1">
                <div className="bg-slate-500 rounded-full h-1 w-1 mt-2"></div>
                </div>
                <div className=" text-xs flex flex-col justify-center font-light mt-2">{publisedDate}</div>
                </div>
                <div>
                <Editbutton id={id} edit={edit}></Editbutton>
                </div>
            </div>
            <div className="text-3xl font-semibold pt-2">{title}</div>
            <div className="text-xl font-thin">{content.slice(0,100)}...</div>
            <div className="font-extralight my-2">{Math.ceil(content.length/300)} Minute read</div>
        </div>
        </Link>
        </div>
    )

}