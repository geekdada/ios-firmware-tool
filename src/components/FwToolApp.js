'use strict';

var React = require('react/addons'),
    ReactTransitionGroup = React.addons.TransitionGroup,
    _ = require('lodash'),
    AMR = require('amazeui-react'),
    {Selected, Table, Grid, Col} = AMR,

    DeviceStore = require('../stores/DeviceStore'),
    FirmwareStore = require('../stores/FirmwareStore'),
    ServerActions = require('../actions/ServerActionCreators'),
    helper = require('../scripts/utils'),

    FirmwareInfo = require('./FirmwareInfo');

(function init() {
  ServerActions.loadAllDevices();
})();

var FwToolApp = React.createClass({
  getInitialState: function() {
    return this._getState();
  },
  componentDidMount: function() {
    DeviceStore.addChangeListener(this._onChange);
    FirmwareStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    DeviceStore.removeChangeListener(this._onChange);
    FirmwareStore.removeChangeListener(this._onChange);
  },
  _getState: function() {
    return {
      deviceList: DeviceStore.getAllDevices(),
      deviceFirmwares: FirmwareStore.getFirmwares()
    };
  },
  _onChange: function() {
    this.setState(this._getState());
  },
  _onDeviceChange: function(value) {
    this.setState({
      selectedDevice: value
    }, function() {
      ServerActions.loadDeviceFirmwares(value);
    });
  },
  _onVersionChange: function(value) {
    this.setState({
      selectedVersion: value
    });
  },
  render: function() {
    let getDeviceOptions = function() {
      let deviceList = this.state.deviceList;

      if (!_.isEmpty(deviceList)) {
        let deviceNodes = [];

        for (let device in deviceList) {
          deviceNodes.push({
            value: device,
            label: deviceList[device]
          });
        }

        return deviceNodes;
      } else {
        return [{
          value: null,
          label: '正在加载...'
        }];
      }
    }.bind(this);

    let getFirmwareOptions = function() {
      let deviceFirmwares = this.state.deviceFirmwares[this.state.selectedDevice];

      if (_.isEmpty(this.state.selectedDevice)) {
        return [{
          value: null,
          label: '请先选择你的机型...'
        }];
      } else if (_.has(deviceFirmwares, 'firmwares') && deviceFirmwares.firmwares.length > 0) {
        let options = deviceFirmwares.firmwares.map(function(firmware) {
          return {
            value: firmware.buildid,
            label: firmware.version + ' - ' + firmware.buildid
          };
        });

        return options;
      } else {
        return [{
          value: null,
          label: '正在加载...'
        }];
      }
    }.bind(this);

    let getFirmwareInfo = function() {
      let {selectedDevice, selectedVersion} = this.state,
          firmwares = FirmwareStore.getFirmwares();

      if (_.has(firmwares, [selectedDevice, 'firmwares'])) {
        return helper.pickFirmwareByBuildId(FirmwareStore.getFirmwares()[selectedDevice].firmwares, selectedVersion)[0];
      } else {
        return null;
      }
    }.bind(this);

    let deviceSelectorOptions = {
      data: getDeviceOptions(),
      onChange: function(value) {
        this._onDeviceChange(value);
      }.bind(this),
      placeholder: '点击选择机型',
      multiple: false,
      searchBox: true,
      maxHeight: 300,
      btnStyle: 'secondary'
    };

    let firmwareSelectorOptions = {
      data: getFirmwareOptions(),
      onChange: function(value) {
        this._onVersionChange(value);
      }.bind(this),
      placeholder: '点击选择版本',
      multiple: false,
      searchBox: true,
      maxHeight: 300,
      btnStyle: 'secondary'
    };

    return (
      <div className='main'>
        <Grid className='panels'>
          <Col className='panel left-panel' sm={12} md={6} lg={3}>
            <div className='section form'>
              <div className='form__row'>
                <Selected { ...deviceSelectorOptions } />
              </div>
              <div className='form__row'>
                <Selected { ...firmwareSelectorOptions } />
              </div>
            </div>
            <div className='section -section-itunes'>
              <h3 className='section__title'>最新版 iTunes 下载</h3>
              <Table compact>
                <thead>
                  <th>平台</th>
                  <th>地址</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Windows (x86)</td>
                    <td><a href='https://api.ipsw.me/v2.1/iTunes/win/latest/url/dl'>下载</a></td>
                  </tr>
                  <tr>
                    <td>Windows (x64)</td>
                    <td><a href='https://api.ipsw.me/v2.1/iTunes/win/latest/64biturl/dl'>下载</a></td>
                  </tr>
                  <tr>
                    <td>Mac OS X</td>
                    <td><a href='https://api.ipsw.me/v2.1/iTunes/osx/latest/url/dl'>下载</a></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col className='panel right-panel' sm={12} md={6} lg={9}>
            <ReactTransitionGroup transitionName="fade">
              <FirmwareInfo firmwareInfo={ getFirmwareInfo() }
                            device={ this.state.deviceList[this.state.selectedDevice] }
                            deviceId={ this.state.selectedDevice } />
            </ReactTransitionGroup>
          </Col>
        </Grid>
      </div>
    );
  }
});

module.exports = FwToolApp;
