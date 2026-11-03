import UserList from "@/components/UserList"
import { Suspense } from "react"

const getUser = ()=> 
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((r)=>r.json())
    .then ((u)=> u)
    .catch ((error)=> error)

export default function Page(){
    const users = getUser()
    return (
        <Suspense>
            <UserList users = {users}/>
        </Suspense>
    )
}