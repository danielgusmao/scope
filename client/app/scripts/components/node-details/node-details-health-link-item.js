import React from 'react';

import NodeDetailsHealthItem from './node-details-health-item';
import CloudLink from '../cloud-link';
import { getMetricColor } from '../../utils/metric-utils';
import { trackMixpanelEvent } from '../../utils/tracking-utils';
import { GRAPH_VIEW_MODE } from '../../constants/naming';

export default class NodeDetailsHealthLinkItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseOver() {
    this.setState({hovered: true});
  }

  onMouseOut() {
    this.setState({hovered: false});
  }

  onClick() {
    trackMixpanelEvent('scope.node.metric.click', {
      layout: GRAPH_VIEW_MODE,
      topologyId: this.props.topologyId,
    });
  }

  render() {
    const { id, nodeColor, url, ...props } = this.props;

    const metricColor = getMetricColor(id);

    return (
      <CloudLink
        alwaysShow
        className="node-details-health-link-item"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onClick={this.onClick}
        url={url}
      >
        <NodeDetailsHealthItem
          {...props}
          hovered={this.state.hovered}
          metricColor={metricColor}
          labelColor={this.state.hovered && nodeColor} />
      </CloudLink>
    );
  }
}