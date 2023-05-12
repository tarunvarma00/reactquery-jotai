import { atom, useAtom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";

const idAtom = atom(1);

const [userAtom] = atomsWithQuery((get) => ({
  queryKey: ["users", get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return res.json();
  },
}));

const JotaiQuery = () => {
  const [data] = useAtom(userAtom);
  return (
    <div>
      <ol>
        {data?.map((user) => {
          return <li>{user.username}</li>;
        })}
      </ol>
    </div>
  );
};

export default JotaiQuery;
