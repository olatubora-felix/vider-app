import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="grid h-screen place-content-center bg-white px-4 dark:bg-blue-900 ">
        <div className="text-center">
          <Image
            src="/images/not-found.svg"
            alt="Logo"
            className="mx-auto h-56 w-auto text-black sm:h-64"
            width={300}
            height={224}
          />

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Uh-oh!
          </h1>

          <p className="mt-4 text-gray-500 dark:text-white">
            We cannot find that page.
          </p>

          <div className="my-4">
            <Link
              href={"/"}
              className="text-base py-2 px-4 bg-blue-900 text-white dark:bg-white dark:text-gray-800 rounded-md"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
