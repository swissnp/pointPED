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
import Link from "next/link";
import Image from "next/image";
import { RecentCalculation } from "@/types/cookies";
import { useCookies } from "react-cookie";

interface NavBarProps {
  loadFromRecents: (recent: RecentCalculation) => void;
  setChangeFromRecents: (value: boolean) => void;
}

export default function NavBar({ loadFromRecents, setChangeFromRecents }: NavBarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PointPED Logo"
              width={32}
              height={32}
              className="h-8 w-8 mr-2"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">PointPED</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <RecentDropdown loadFromRecents={loadFromRecents} setChangeFromRecents={setChangeFromRecents} />
        </div>
      </div>
    </nav>
  );
}

function RecentDropdown({ loadFromRecents, setChangeFromRecents }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies] = useCookies(["recents"]);

  const { x, y, refs, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
    click,
  ]);
  
  const recents: RecentCalculation[] = cookies.recents || [];

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
        {isOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mt-4 w-auto bg-base-100 p-2 text-neutral shadow-lg"
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              minWidth: '300px',
            }}
            {...getFloatingProps()}
          >
            <li className="menu-title px-4 py-2">Recents</li>
            {recents.length === 0 ? (
              <li className="px-4 py-2 text-center text-base-content text-opacity-60">
                No recent calculations
              </li>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-zebra table w-full table-compact">
                  <thead>
                    <tr>
                      <th>Wt(kg)</th>
                      <th>Ht(cm)</th>
                      <th>Sex</th>
                      <th>Age</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recents.map((recent, i) => (
                      <tr key={i} className="hover:bg-base-200">
                        <td>{recent.weight || "-"}</td>
                        <td>{recent.height || "-"}</td>
                        <td>{recent.sex || "-"}</td>
                        <td>{`${recent.age} ${recent.ageUnit}`}</td>
                        <td>
                          <button
                            className="btn-primary btn-sm btn"
                            onClick={() => {
                              loadFromRecents(recent);
                              setIsOpen(false);
                              setChangeFromRecents(true);
                            }}
                          >
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ul>
        )}
      </FloatingPortal>
    </>
  );
}
