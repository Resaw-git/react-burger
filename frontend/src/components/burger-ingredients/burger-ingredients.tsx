import { FC, useState, useEffect, useRef, RefObject } from "react";
import { Tab } from "../../utils/UI";
import styles from "./burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useSelectorHook } from "../../hooks/redux";
import { useInView } from "react-intersection-observer";
import { IIngredient } from "../../utils/types";

const BurgerIngredients: FC = () => {
  const { ingredientsArray } = useSelectorHook((store) => store.ingredients);
  const bunSectionRef = useRef<HTMLDivElement | null>(null);
  const sauceSectionRef = useRef<HTMLDivElement | null>(null);
  const mainSectionRef = useRef<HTMLDivElement | null>(null);

  const [current, setCurrent] = useState("bun");

  const onTabClick = (value: string) => {
    setCurrent(value);
    const refs: Record<string, RefObject<HTMLDivElement>> = {
      bun: bunSectionRef,
      sauce: sauceSectionRef,
      main: mainSectionRef,
    };

    refs[value]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderElements = (ingredients: IIngredient[], category: "Булки" | "Соусы" | "Начинки") => {
    const type =
      (category === "Булки" && "bun") || (category === "Соусы" && "sauce") || (category === "Начинки" && "main");

    const result = ingredients.map((e) => e.type === type && <IngredientItem key={e._id} id={e._id} />);

    return (
      <>
        <h2 className={"text text_type_main-medium" + (category !== "Булки" ? " mt-10" : "")}>{category}</h2>
        <div className={styles.items}>{result}</div>
      </>
    );
  };

  const [bunRef, inViewBun] = useInView({
    threshold: 0.5,
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0.5,
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  return (
    <div className={styles.warp}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={styles.main}>
        <div className={styles.tabs}>
          <Tab value="bun" active={current === "bun"} onClick={() => onTabClick("bun")}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={() => onTabClick("sauce")}>
            Соусы
          </Tab>
          <Tab value="main" active={current === "main"} onClick={() => onTabClick("main")}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <div
            ref={(node) => {
              bunRef(node);
              bunSectionRef.current = node;
            }}
          >
            {renderElements(ingredientsArray, "Булки")}
          </div>
          <div
            ref={(node) => {
              sauceRef(node);
              sauceSectionRef.current = node;
            }}
          >
            {renderElements(ingredientsArray, "Соусы")}
          </div>
          <div
            ref={(node) => {
              mainRef(node);
              mainSectionRef.current = node;
            }}
          >
            {renderElements(ingredientsArray, "Начинки")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
