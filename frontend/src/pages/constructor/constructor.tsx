import React, { FC, ReactNode, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import {useDispatchHook, useSelectorHook} from "../../hooks/redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Loader from "../../components/loader/loader";
import desktop from "./container.desktop.module.css";
import mobile from "./container.mobile.module.css";
import { Tab } from "../../utils/UI";
import { useInView } from "react-intersection-observer";
import { IIngredient } from "../../utils/types";
import IngredientItemMobile from "../../components/ingredient-item-mobile/ingredient-item-mobile";
import { Button, CurrencyIcon } from "../../components/shared";
import MobileModal from "../../components/mobile-modal/mobile-modal";
import {closeMobileModal, openMobileModal} from "../../services/actions/modal";
import MobileConstructor from "../../components/mobile-constructor/mobile-constructor";
import { v4 as uuidv4 } from "uuid";

export const Constructor: FC = () => {
  const { ingredientsArray, ingredientsFailed, ingredientsRequest } = useSelectorHook((store) => store.ingredients);
  const [current, setCurrent] = React.useState("bun");
  const { constructorIng, constructorBun } = useSelectorHook((store) => store.constructorList);
  const { mobileModal } = useSelectorHook((store) => store.modal);
  const dispatch = useDispatchHook();
  const getTotalSum = (ingredients: IIngredient[], bun: IIngredient[]) => {
    const arr = [...ingredients, ...bun];
    return arr.reduce(
      (accum, current) => (current.type === "bun" ? accum + current.price * 2 : accum + current.price),
      0,
    );
  };

  const closeModal = () => {
    closeMobileModal(dispatch)
  }

  const openModal = () => {
    openMobileModal(dispatch)
  }

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [window.innerWidth]);

  const [bunRef, inViewBun] = useInView({
    threshold: 0.5,
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0.5,
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const renderElements = (ingredients: IIngredient[], category: "Булки" | "Соусы" | "Начинки"): ReactNode => {
    const type =
      (category === "Булки" && "bun") || (category === "Соусы" && "sauce") || (category === "Начинки" && "main");

    const result = ingredients.map((e) => e.type === type && <IngredientItemMobile key={uuidv4()} id={e._id} />);

    return (
      <>
        <h2 className={mobile.category_title + " text text_type_main-medium pt-8 pb-2 mb-6"}>{category}</h2>
        <div className={mobile.items}>{result}</div>
      </>
    );
  };

  return (
    <>
      {width >= 1280 ? (
        <main className={desktop.main}>
          <div className={desktop.container}>
            {ingredientsRequest && (
              <div className={desktop.info}>
                <Loader />
              </div>
            )}
            {ingredientsFailed && (
              <div className={desktop.info}>
                <p className="text text_type_main-large">Произошла ошибка получения данных</p>
              </div>
            )}
            {!ingredientsFailed && ingredientsArray.length > 0 && (
              <DndProvider backend={HTML5Backend}>
                <section>
                  <BurgerIngredients />
                </section>
                <section>
                  <BurgerConstructor />
                </section>
              </DndProvider>
            )}
          </div>
        </main>
      ) : (
        <main className={mobile.container}>
          <h1 className={mobile.title}>Соберите бургер</h1>
          <div className={mobile.tabs}>
            <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
              <p className="text text_type_main-small">Булки</p>
            </Tab>
            <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
              <p className="text text_type_main-small">Соусы</p>
            </Tab>
            <Tab value="main" active={current === "main"} onClick={setCurrent}>
              <p className="text text_type_main-small">Начинки</p>
            </Tab>
          </div>
          <div className={mobile.ingredients}>
            <div className={mobile.category} ref={bunRef}>
              {renderElements(ingredientsArray, "Булки")}
            </div>
            <div ref={sauceRef}>{renderElements(ingredientsArray, "Соусы")}</div>
            <div ref={mainRef}>{renderElements(ingredientsArray, "Начинки")}</div>
          </div>
          <div className={mobile.total}>
            <div className={mobile.price}>
              {getTotalSum(constructorIng, constructorBun)}
              <CurrencyIcon type="primary" />
            </div>
            <Button
              htmlType="button"
              size={"small"}
              disabled={constructorBun.length === 0 && constructorIng.length === 0}
              onClick={openModal}
            >
              Смотреть заказ
            </Button>
          </div>
          {mobileModal &&
              <MobileModal onClose={closeModal}>
                <MobileConstructor />
              </MobileModal>
          }
        </main>
      )}
    </>
  );
};
