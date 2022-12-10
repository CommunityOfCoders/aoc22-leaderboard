import Image from "next/image";
import { useState } from "react";
import image from "../coc_dark_ukajqb.png";
import advent from "../download.jpeg";
import TableRow from "../components/TableRow";

function Home({ leaderboard }) {
  let mem = Object.values(leaderboard.members);
  mem = mem.sort((a, b) => {
    if (b.local_score < a.local_score) {
      return -1;
    }
  });
  const [i, setI] = useState(0);
  const handlePages = (step) => {
    if (i === 0 && step === "-1") {
      return;
    }
    if (i >= mem.length && step === "1") {
      return;
    }
    if (step === "1") {
      increment();
    } else {
      decrement();
    }
  };
  const increment = () => {
    setI((i) => i + 10);
  };
  const decrement = () => {
    setI((i) => i - 10);
  };
  return (
    <div className="lg:my-20 lg:mx-32 mx-4 my-4 items-center">
      <div className="lg:my-20 flex flex-col lg:flex-row lg:justify-around justify-center items-center lg:w-[850px] lg:m-auto my-4">
        <Image
          src={image}
          className="rounded-[50%] lg:w-[200px] lg:h-[200px] h-[100px] w-[100px]"
        ></Image>
        <h1 className="text-[50px] lg:mt-20">Leaderboard</h1>
        <Image
          src={advent}
          className="rounded-[50%] lg:w-[200px] lg:h-[200px] h-[100px] w-[100px]"
        ></Image>
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
            </tr>
          </thead>
          <tbody>
            {mem.slice(i + 1, 12 + i).map((item, idx) => {
              return <TableRow i={i} item={item} idx={idx} key={item.id} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center m-10">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            {i !== 0 && (
              <li>
                <button
                  className="px-10 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePages("-1")}
                >
                  <span className="text-2xl">&larr;</span>
                </button>
              </li>
            )}
            {i !== mem.length && (
              <li>
                <button
                  className="px-10 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePages("1")}
                >
                  <span className="text-2xl">&rarr;</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  let myHeaders = new Headers();
  myHeaders.append("cookie", `${process.env.SESSION_ID}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`${process.env.API_LINK}`, requestOptions);
  const leaderboard = await response.json();

  return {
    props: {
      leaderboard,
    },
    revalidate: 15 * 60,
  };
}
