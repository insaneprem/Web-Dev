// import { CountContext } from './Pages/Context';

import { useRecoilState, useRecoilValue, RecoilRoot } from "recoil";
import { countAtom } from "./Store/atoms/Count";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  return (
    <div>
      <CountRender />
      <Buttons />
      <Iseven/>
    </div>
  );
}
function Iseven(){
  const count = useRecoilValue(countAtom)
  return <div>
     The value is {count%2 ? "ODD" : null}
  </div>
}
function CountRender() {
  const count = useRecoilValue(countAtom);
  return (
    <div>
      <b>{count}</b>
    </div>
  );
}

function Buttons() {
  const [count, setCount] = useRecoilState(countAtom);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App;
