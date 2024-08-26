import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"

interface fullblog {
    title:string,
    content:string,
    date:string,
    authorname:string
}

export const FullBlog = ({title,content,date,authorname}:fullblog)=>{
    return (
         <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on {date}
                    </div>
                    <div className="pt-4">
                        {content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size={8} Authorname={authorname || "Anonymous"} pad={2} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {authorname || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
    )
}