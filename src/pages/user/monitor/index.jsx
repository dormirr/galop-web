import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Tooltip } from 'antd';
import React, { Component, useRef, useEffect } from 'react';
import { Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { Area } from '@antv/g2plot';
import styles from './style.less';

const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.userPortrait} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          你好，
          {currentUser.userName}
          ，祝你开心每一天！
        </div>
      </div>
    </div>
  );
};

const Radar = (props) => {
  const data = props.data;

  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    const areaPlot = new Area(container.current, {
      data,
      xField: 'match',
      yField: 'value',
      smooth: true,
      interactions: [
        {
          type: 'slider',
        },
      ],
    });
    areaPlot.render();
  }, []);

  return (
    <div>
      <div ref={container} />
    </div>
  );
};

class Workplace extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/clear',
    });
  }

  renderActivities = item => {
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          title={
            <span>
              <Link to={{
                pathname: '../announcement/read-announcement',
                state: { id: item.id },
              }}>
                {item.announcementTitle}
              </Link>
            </span>
          }
          description={
            <span className={styles.datetime} title="公告发表时间">
              公告发表于 {moment(item.createTime).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  renderFightingCapacityActivities = item => {
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.userPortrait} />}
          title={
            <span>
              <span className={styles.event}>{item.userName}</span>
            </span>
          }
          description={
            <span className={styles.datetime}>
              战斗力：{item.userFightingCapacity}
            </span>
          }
        />
      </List.Item>
    );
  };
  render() {
    const {
      currentUser,
      ongoingMatchInfo,
      ongoingMatchInfoLoading,
      findTenAnnouncement,
      findTenAnnouncementLoading,
      changeMatch,
      changeMatchLoading,
      findUserFightingCapacity,
      findUserFightingCapacityLoading,
    } = this.props;

    if (!currentUser || !currentUser.userNumber) {
      return null;
    }

    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              title="比赛参与人数变化表"
              loading={changeMatchLoading}
            >
              <div className={styles.chart}>

                <div id="container"></div>
                <Radar data={changeMatch} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="尚未结束的比赛"
              bordered={false}
              loading={ongoingMatchInfoLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {ongoingMatchInfo.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <Statistic.Countdown value={item.endTime} />
                      }
                      description={

                        <Tooltip title={<span>要求参赛团队人数：{item.teamSize} 人<br />奖励计算公式：{item.championAward} - (名次 - 1) * {item.decrementParameter}</span>}>
                          <span>{item.matchName}</span>
                        </Tooltip>
                      }
                    />
                    <div className={styles.projectItemContent}>
                      {item.createTime && (
                        <span className={styles.datetime} title="报名时间">
                          报名开始于 {moment(item.createTime).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{
                padding: 0,
              }}
              bordered={false}
              className={styles.activeCard}
              title="公告"
              loading={findTenAnnouncementLoading}
            >
              <List
                loading={findTenAnnouncementLoading}
                renderItem={item => this.renderActivities(item)}
                dataSource={findTenAnnouncement}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>

          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              className={styles.activeCard}
              title="战斗力排行榜"
              loading={findUserFightingCapacityLoading}
            >
              <List
                loading={findUserFightingCapacityLoading}
                renderItem={item => this.renderFightingCapacityActivities(item)}
                dataSource={findUserFightingCapacity}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
        </Row>        
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({ monitor: { currentUser, ongoingMatchInfo, findTenAnnouncement, changeMatch, findUserFightingCapacity }, loading }) => ({
    currentUser,
    ongoingMatchInfo,
    findTenAnnouncement,
    changeMatch,
    findUserFightingCapacity,

    currentUserLoading: loading.effects['monitor/fetchCurrentUser'],
    ongoingMatchInfoLoading: loading.effects['monitor/ongoingMatchInfo'],
    findTenAnnouncementLoading: loading.effects['monitor/findTenAnnouncement'],
    changeMatchLoading: loading.effects['monitor/changeMatch'],
    findUserFightingCapacityLoading: loading.effects['monitor/findUserFightingCapacity'],
  }),
)(Workplace);
