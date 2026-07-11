import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import ActivityTimeline from "./ActivityTimeline";

export default function DashboardWidgets({

  activities = [],

  timeline = [],

}) {

  return (

    <div className="grid xl:grid-cols-3 gap-6 mt-8">

      <div>

        <QuickActions />

      </div>

      <div>

        <RecentActivity
          activities={activities}
        />

      </div>

      <div>

        <ActivityTimeline
          items={timeline}
        />

      </div>

    </div>

  );

}