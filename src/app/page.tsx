"use client";

import { useGetLegalDocumentsQuery } from "./redux/features/legalDocument/legalDocumentApi";

export default function Home() {
  const { data, isError, isLoading, isSuccess } = useGetLegalDocumentsQuery({});

  console.log(data, isError, isLoading, isSuccess);
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Arnifi - Legal Drafter - CMS</h1>
    </main>
  );
}
