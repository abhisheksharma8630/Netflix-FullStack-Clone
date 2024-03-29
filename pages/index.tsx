import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";


export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent: false,
      }
    }
  }
  return {
    props:{}
  }
}

export default function Home() {
  const {data:user} = useCurrentUser();

  return (
    <div>
      <p className='bg-red-400'>Netflix Clone</p>
      <p className="bg-white">Logged in as : {user?.name}</p>
      <button className="bg-white" onClick={()=>signOut()}>Logout</button>
    </div>
  )
}
