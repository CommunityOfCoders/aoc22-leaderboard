import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { leaderboard } from '../data/leaderboard'
import { useState } from 'react';
import image from "../coc_dark_ukajqb.png"
import advent from "../download.jpeg"
import axios from "axios"

// export async function getServerSideProps({req,res}){
//   console.log(req.headers)
//   res.setHeader("cookie", "session=53616c7465645f5f0ff2fe88ea40354520c3b723a210a4dcc7da6e0541ffb87fd5f46fb96e7bbcf9118be4bd1b669fbcc59661ba2d99d01b754bbc884b61c8fe")
//   res = await fetch(`https://adventofcode.com/2022/leaderboard/private/view/1711496.json`)
//   console.log(res)

//   return {
//     props: {
//       pokemon : res.json(),
//     },
//   };
// }


export default function Home({}) {
  let mem = Object.values(leaderboard[0].members);
  mem = mem.sort((a, b)=>{
    if(b.local_score < a.local_score){
      return -1
    }
  });
  const [i, setI] = useState(0);
  const handlePages = (step) => {
    console.log(step)
    if(i === 0 && step === '-1'){
      return
    }
    if(i >= mem.length && step === '1'){
      return
    }
    if(step === '1'){
      increment()
    }
    else{
      decrement()
    }
    console.log(i)
  }
  const increment = () => {
    setI((i) => i+10)
  }
  const decrement = () => {
    setI((i) => i-10)
  }
  return (
    <div className="my-20 mx-32 items-center">
      <div className="my-20 flex flex-row justify-around w-[850px] m-auto">
        <Image src={image} height={200} width={200} className="rounded-[50%]"></Image>
        <h1 className="text-[50px] mt-20">Leaderboard</h1>
        <Image src={advent} height={200} width={200} className="rounded-[50%]"></Image>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                     <th scope="col" className="py-3 px-6">
                        Rank
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Participants
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Stars
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Last Stars
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Local Score
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Global Score
                    </th>
                </tr>
            </thead>
            <tbody>
                {mem.slice(i+1,12+i).map((item, idx)=>{
                  return(
                    item.name && 
                    (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={idx}>
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {i+idx}
                        </th>
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </th>
                        <td className="py-4 px-6 flex flex-row">
                            { item.stars >= 1 &&
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24"   strokeWidth={0} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            </span>
                            }
                            { item.stars >= 2 &&
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24"   strokeWidth={0} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            </span>
                            }
                            { item.stars >= 3 &&
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24"   strokeWidth={0} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            </span>
                            }
                            { item.stars >= 4 &&
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24"   strokeWidth={0} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            </span>
                            }
                            { item.stars == 5 &&
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24"   strokeWidth={0} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            </span>
                            }
                            { item.stars > 5 && 
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24"   strokeWidth={0} stroke="#FFd700" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                ...
                              </span>
                            }
                        </td>
                        <td className="py-4 px-6">
                            {item.last_star_ts}
                        </td>
                        <td className="py-4 px-6">
                            {item.local_score}
                        </td>
                        <td className="py-4 px-6">
                            {item.global_score}
                        </td>
                      </tr>
                    </>
                    )
                  )
                })}
            </tbody>
        </table>
      </div>
      <div className="flex justify-center m-10">
        <nav aria-label="Page navigation example" >
          <ul class="inline-flex -space-x-px">
            {i !== 0 && <li>
              <button class="px-10 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handlePages('-1')}><span className="text-2xl">&larr;</span></button>
            </li>}
            {i !== mem.length && <li>
              <button class="px-10 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handlePages('1')}><span className="text-2xl">&rarr;</span></button>
            </li>}
          </ul>
        </nav>
      </div>
    </div>
  )
}
