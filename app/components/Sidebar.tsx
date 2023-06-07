

import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white p-5 sidebar">
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/">
              DASHBOARD
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/uspopulation">
              US POPULATION
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/universities">
              UNIVERSITIES
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
}

