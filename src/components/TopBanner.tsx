import React, { Fragment } from "react";
import Search from "./Search";

const TopBanner = ({ showSearch = false }: TopBannerProps) => {
  return (
    <section className="bg-blue-900 text-white py-6 text-center">
      <div className="container mx-auto">
        {showSearch ? (
          <Search />
        ) : (
          <Fragment>
            <h2 className="text-3xl font-semibold">
              Unlock Your Career Potential
            </h2>
            <p className="text-lg mt-2">
              Discover the perfect job opportunity for you.
            </p>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default TopBanner;
interface TopBannerProps {
  showSearch: boolean;
}
