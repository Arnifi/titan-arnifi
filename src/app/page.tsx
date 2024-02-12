import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
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
