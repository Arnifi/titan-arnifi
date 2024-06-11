import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Arnifi | Visa Applications",
  description: "Generated by create next app",
};

const CompanyApplicationsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

export default CompanyApplicationsLayout;
