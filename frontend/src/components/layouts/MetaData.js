import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  // we can also call it props but we are destructuring here
  return (
    <Helmet>
      <title>{`${title} -LootLo.pk`}</title>
    </Helmet>
  );
};

export default MetaData;
