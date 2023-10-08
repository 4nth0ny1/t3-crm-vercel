import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">daisyUI</a>
      </div>
      <div className="flex-none gap-10">
        <ul className="flex flex-row gap-10">
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link href="/accounts">
            <li>Accounts</li>
          </Link>
          <Link href="/reports">
            <li>Reports</li>
          </Link>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={sessionData?.user.image as string}
                alt="image.png"
                width={50}
                className="rounded-full"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button className="bg-gray-300 p-4" onClick={() => signOut()}>
                SignOut
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
