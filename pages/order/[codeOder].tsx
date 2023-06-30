import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OrderDetail() {
    const router = useRouter();
    const codeOrder = router.query.codeOrder;

    useEffect(() =>{
        console.log(codeOrder)
    },[])
    return (
      <div>
        <div>This Detail</div>
      </div>
    );
  }
  