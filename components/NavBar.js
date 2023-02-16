import { ClockIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useFocus,
  useDismiss,
  useClick,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

export default function NavBar(props) {
  const cookies = props.cookies;
  const setWeight = props.setWeight;
  const setHeight = props.setHeight;
  const setSex = props.setSex;
  return (
    <div className="navbar bg-base-100 drop-shadow ">
      <div className="navbar-start">
        <a className="btn-ghost btn text-xl normal-case text-primary">
          Point<div className="text-base-content">PED</div>
        </a>
      </div>
      <div className="navbar-end">
        <RecentsBox
          cookies={cookies}
          setWeight={setWeight}
          setHeight={setHeight}
          setSex={setSex}
        />
      </div>
    </div>
  );
}
function setFields(weight, height, sex, setWeight, setHeight, setSex) {
  setHeight(height);
  setWeight(weight);
  setSex(sex);
}

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}


function RecentsBox(props) {
  const [open, setOpen] = useState(false);
  const cookies = props.cookies;
  const setWeight = props.setWeight;
  const setHeight = props.setHeight;
  const setSex = props.setSex;

  let list = [];
  if (open) {
    let currentCookie = cookies.recents.data;
    console.log(currentCookie);
    for (let i = 0; i < currentCookie.length; i++) {
      list.push(
        <li key={currentCookie[i].value}>
          <a
            onClick={() =>{setFields(
                currentCookie[i].weight,
                currentCookie[i].height,
                currentCookie[i].sex,
                setWeight,
                setHeight,
                setSex
              )
              setOpen(false)}
            }
          >
            W:{currentCookie[i].weight} H:{currentCookie[i].height}{" "}
            Sex:{currentCookie[i].sex.label}
          </a>
        </li>
      );
    }
  }
  // for (let i = 0; i < currentCookie.length; i++) {
  //   list.push(
  //     <li key={currentCookie[i].value}>
  //       <a>{currentCookie[i].label}</a>
  //     </li>
  //   );
  // }

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    // Make sure the RecentsBox stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  // Event listeners to change the open state
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const click = useClick(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
    click,
  ]);
  return (
    <>
      <label
        tabIndex={0}
        className="btn-outline btn-primary rounded-btn btn"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <ClockIcon className="h-6 w-6 " />
      </label>
      <FloatingPortal>
        {open && (
          <div className="Tooltip card dropdown-content rounded-box w-64 bg-base-100 shadow-lg ">
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 text-neutral shadow-lg transition delay-150 duration-300 ease-in-out"
              ref={refs.setFloating}
              style={{
                // Positioning styles
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
              {...getFloatingProps()}
            >
              <li className="card-title py-2">History</li>
              {list}
            </ul>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
