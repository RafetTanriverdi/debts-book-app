// app/business/page.tsx
import { redirect } from "next/navigation";

export default function BusinessRedirectPage() {
  redirect("/business/products");
}
