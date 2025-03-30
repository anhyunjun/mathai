import React from "react";
import Breadcrumbs from "../components/design-system/Breadcrumbs";

export default {
  title: "Design System/Breadcrumbs",
  component: Breadcrumbs,
};

export const Default = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Breadcrumbs</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-base font-bold mb-2">2 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">3 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">4 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">5 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Four", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">6 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Four", href: "#" },
              { label: "Five", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">7 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Four", href: "#" },
              { label: "Five", href: "#" },
              { label: "Six", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">8 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Four", href: "#" },
              { label: "Five", href: "#" },
              { label: "Six", href: "#" },
              { label: "Seven", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">9 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Four", href: "#" },
              { label: "Five", href: "#" },
              { label: "Six", href: "#" },
              { label: "Seven", href: "#" },
              { label: "Eight", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">10 items</h3>
          <Breadcrumbs
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Four", href: "#" },
              { label: "Five", href: "#" },
              { label: "Six", href: "#" },
              { label: "Seven", href: "#" },
              { label: "Eight", href: "#" },
              { label: "Nine", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>

        <div>
          <h3 className="text-base font-bold mb-2">6+ items (truncated)</h3>
          <Breadcrumbs
            maxVisible={4}
            items={[
              { label: "One", href: "#" },
              { label: "Two", href: "#" },
              { label: "Three", href: "#" },
              { label: "Four", href: "#" },
              { label: "Current Page", isCurrent: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
