import React from 'react';
import { Spin } from 'antd';
import isEqual from 'lodash/isEqual';
import { isComponentClass } from './Secured';
// eslint-disable-next-line import/no-cycle

export default class PromiseRender extends React.Component {
  state = {
    component: () => null,
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { component } = this.state;

    if (!isEqual(nextProps, this.props)) {
      this.setRenderComponent(nextProps);
    }

    if (nextState.component !== component) return true;
    return false;
  };

  // 设置渲染组件：ok 或 error
  setRenderComponent(props) {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
        return true;
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  }

  // 确定传入组件是否已实例化
  // AuthorizedRoute 已经实例化
  // 授权的渲染已经实例化，子级没有实例化
  // 安全未实例化
  checkIsInstantiation = target => {
    if (isComponentClass(target)) {
      const Target = target;
      return props => <Target {...props} />;
    }

    if (React.isValidElement(target)) {
      return props => React.cloneElement(target, props);
    }

    return () => target;
  };

  render() {
    const { component: Component } = this.state;
    const { ok, error, promise, ...rest } = this.props;
    return Component ? (
      <Component {...rest} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
