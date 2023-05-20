import Style from "./buttonComponent.module.scss";

export default function ButtonComponent({
  title,
  ...props
}: {
  title: string;
}) {
  return (
    <button className={`${Style["resuable-btn"]}`} {...props}>
      {title}
    </button>
  );
}
