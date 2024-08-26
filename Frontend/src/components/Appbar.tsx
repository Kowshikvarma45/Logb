import { useRecoilValue } from "recoil"
import { userAtom } from "../stores/atoms/UserAtoms"
import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"

export const Appbar = ()=>{
    const username = useRecoilValue(userAtom)
    return (
        <div className="p-5 m-4 flex justify-between border-solid border-b-2 border-slate-300">
            <div>
                <Link to={'/blogs'}>
                <div className="text-3xl hover:scale-105 hover:font-normal">LogB</div>
                </Link>
            </div>
            <div>
                <div className="flex justify-around">
                <div className="mr-6">
                    <Link to={'/publish'}>
                        <button className="bg-green-800 p-2 rounded-md text-white hover:scale-110 duration-500 hover:bg-green-900 hover:rounded-lg">Publish</button>
                    </Link>
                </div>
                <Link to={'/Account'}>
                <Avatar size={10} pad={2} Authorname={username}></Avatar>
                </Link>
                </div>
            </div>
        </div>
    )
}