import React from "react"
import { Container } from "react-bootstrap"
import { WebData } from "../webdata"
import { Spinner } from "./Spinner"
import { ActivityChart } from "./ActivityChart"
import { Current } from "../world"
import { useTeamApi } from "../useApi"

interface IChartData {
  readonly labels: Array<string>
  readonly datasets: {
    readonly approved: Array<number>
    readonly merged: Array<number>
    readonly updated: Array<number>
  }
}
interface IActivityData {
  readonly kodiakActivity: IChartData
  readonly pullRequestActivity: IChartData
}

export function ActivityPage() {
  const data = useTeamApi(Current.api.getActivity)
  return <ActivityPageInner data={data} />
}

interface IActivityPageInnerProps {
  readonly data: WebData<IActivityData>
}
function ActivityPageInner({ data }: IActivityPageInnerProps) {
  if (data.status === "loading") {
    return (
      <ActivityPageContainer className="h-100">
        <Spinner />
      </ActivityPageContainer>
    )
  }
  if (data.status === "failure") {
    return (
      <ActivityPageContainer>
        <p className="text-center text-muted">failed to load activity data</p>
      </ActivityPageContainer>
    )
  }

  return (
    <ActivityPageContainer>
      <h3 className="h5">Pull Request Activity</h3>
      <ActivityChart data={data.data.pullRequestActivity} />
      <h3 className="h5">Kodiak Activity</h3>
      <ActivityChart data={data.data.kodiakActivity} />
    </ActivityPageContainer>
  )
}

interface IActivityPageContainer {
  readonly children: React.ReactNode
  readonly className?: string
}
function ActivityPageContainer({
  children,
  className,
}: IActivityPageContainer) {
  return (
    <Container className={className}>
      <h2>Activity</h2>
      {children}
    </Container>
  )
}
