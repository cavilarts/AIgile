import { Card } from "@nextui-org/react";

export function Loading() {
  return (
    <section className="flex justify-end">
      <Card className="flex max-w-xs">
        <svg
          width="90"
          height="30"
          viewBox="0 0 90 30"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000"
        >
          <circle cx="15" cy="15" r="6">
            <animate
              attributeName="r"
              from="6"
              to="6"
              begin="0s"
              dur="0.8s"
              values="6;3;6"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="45" cy="15" r="3" fillOpacity="0.3">
            <animate
              attributeName="r"
              from="3"
              to="3"
              begin="0s"
              dur="0.8s"
              values="3;6;3"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="0.5"
              to="0.5"
              begin="0s"
              dur="0.8s"
              values=".5;1;.5"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="75" cy="15" r="6">
            <animate
              attributeName="r"
              from="6"
              to="6"
              begin="0s"
              dur="0.8s"
              values="6;3;6"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </Card>
    </section>
  );
}
