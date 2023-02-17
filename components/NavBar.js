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
  useTransitionStyles,
} from "@floating-ui/react";

export default function NavBar(props) {
  const cookies = props.cookies;
  const setWeight = props.setWeight;
  const setHeight = props.setHeight;
  const setSex = props.setSex;
  const setChangeFromRecents = props.setChangeFromRecents;
  return (
    <div className="navbar bg-base-100 drop-shadow ">
      <div className="navbar-start">
        <a className="btn-ghost btn text-xl normal-case text-primary">
          <div className="text-xl text-primary">.</div>
          <div className="text-base-content">PED</div>
        </a>
      </div>
      <div className="navbar-end">
        <RecentsBox
          cookies={cookies}
          setWeight={setWeight}
          setHeight={setHeight}
          setSex={setSex}
          setChangeFromRecents={setChangeFromRecents}
        />
      </div>
    </div>
  );
}

function RecentsBox(props) {
  const [open, setOpen] = useState(false);
  const cookies = props.cookies;
  const setWeight = props.setWeight;
  const setHeight = props.setHeight;
  const setSex = props.setSex;
  const setChangeFromRecents = props.setChangeFromRecents;

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
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 200,
      close: 200,
    },
  });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
    click,
  ]);
  let list = [];
  if (isMounted) {
    try {
      let currentCookie = cookies.recents.data;
      for (let i = currentCookie.length-1; i >= 0; i--) {
        list.push(
          <tr
            key={currentCookie[i].value}
            onClick={() => {
              setHeight(currentCookie[i].height);
              setWeight(currentCookie[i].weight);
              setSex(currentCookie[i].sex);
              setOpen(false);
              setChangeFromRecents(true);
            }}
            className="btn-ghost hover"
            tabIndex={0}
          >
            <td>{currentCookie[i].weight}</td>
            <td>{currentCookie[i].height}</td>
            <td>{currentCookie[i].sex.label}</td>
          </tr>
        );
      }
    } catch (e) {
      console.log("NO RECENTS");
    }
  }
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
        {isMounted && (
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mt-4 w-fit bg-base-100 p-2 text-neutral shadow-lg"
            ref={refs.setFloating}
            style={{
              // Positioning styles
              ...styles,
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            <li className="card-title py-2">Recents</li>
            {list.length === 0 ? (
              <div className="px-4 py-2 text-center text-gray-500">
                No recent calculations
              </div>
            ) : (
              <table className="table-zebra table w-full">
                <thead>
                  <tr>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Sex</th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </table>
            )}
          </ul>
        )}
      </FloatingPortal>
    </>
  );
}
