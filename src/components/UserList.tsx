import React, { use } from 'react'

// export default function UserList({users}:{users:{id:string,username:string}}) {
export default function UserList({users}: {users:Promise<{id:string,username:string}[]>}) {
    const userData = use(users)
  return (
    <div>
        {/* {userData.map(({id:string,username:string})=> (<h1>{username}</h1>key={id}))} */}
        {/* {userData.map((u)=>(<h1 key={u.id}>{u.username}</h1>))} */}
        {/* {userData.map(({id,username})=> (<h1 key={id}>{username}</h1>))} */}
        {userData.map(function user(u){
            return (
                <h1 key={u.id}>{u.username}</h1>
            )
        })}
    </div>
  )
}