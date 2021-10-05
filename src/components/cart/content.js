import { useEffect } from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import { useStore } from "../../context/GlobalState";
import useDarkMode from "../../hooks/useDarkMode";
import getUserCartItems from "../../services/firebase";
import Actions from "./actions";

export default function Content() {
  const [colorTheme] = useDarkMode();
  const {
    user: { uid: userId = "" },
    getUserCart,
    cart,
  } = useStore();
  useEffect(() => {
    const getUserCartInfo = async () => {
      const [result] = await getUserCartItems(userId);
      getUserCart(result);
    };
    if (userId) {
      getUserCartInfo();
    }
    // here cart will be empty in store

    // eslint-disable-next-line
  }, [userId]);

  return (
    <div>
      <div className="pt-2">
        {cart ? (
          cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={`${item.proId} - ${item.size}-${Date.now()}-${item.count}`}
              >
                <Actions
                  proId={item.proId}
                  size={item.size}
                  count={item.count}
                  price={item.price}
                  name={item.name}
                ></Actions>
              </div>
            ))
          ) : (
            colorTheme === "dark"? (
              <Skeleton
              count={1}
              height={800}
              width={800}
              className="px-8 mx-8"
            ></Skeleton>
            ):(
              <SkeletonTheme
              className="skeleton"
              color="#1E1E1E"
              highlightColor="#121212"
            >
            <Skeleton
              count={1}
              height={800}
              width={800}
              className="px-8 mx-8"
            ></Skeleton>
            </SkeletonTheme>
            )
          )
        ) : (
          <img
            src="/images/addtocart.jpg"
            className="container mx-auto lg:w-2/5 sm:w-3/5"
            alt="product"
          />
        )}
      </div>
    </div>
  );

  // onClick={handleDelete(item.proId, item.size, item.name, item.count, item.price)}
}
