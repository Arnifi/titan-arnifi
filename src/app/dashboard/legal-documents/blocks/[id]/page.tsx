"use client";

import { useGetFormStepQuery } from "@/lib/Redux/features/formStep/formStepApi";
import React from "react";

const FieldBlock = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useGetFormStepQuery({ id: params.id });
  console.log(data, isLoading, isError);
  return <div>this is field block id: {params.id}</div>;
};

export default FieldBlock;
