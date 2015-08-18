'use strict';

var React = require('react/addons'),
    classNames = require('classNames'),
    AMR = require('amazeui-react'),
    {Button, Icon} = AMR;

var SignBox = React.createClass({
  render: function() {
    if (this.props.signed) {
      return (
        <p>
          这个版本的固件可以通过 iTunes 进行「恢复」或「升级」。
        </p>
      );
    } else {
      return (
        <p>
          这个版本的固件由于已经停止签名，所以<b>无法使用</b>。
        </p>
      );
    }
  }
});

var FirmwareInfo = React.createClass({
  render: function() {
    let firmwareInfo = this.props.firmwareInfo;

    let getDetails = function() {
      if (firmwareInfo) {
        let signBoxClasses = classNames(
          'info__sign',
          'clearfix',
          firmwareInfo.signed ? '-signed-true' : '-signed-false'
        );
        let getReleaseDate = function() {
          if (Date.prototype.hasOwnProperty('toLocaleString')) {
            return new Date(firmwareInfo.releasedate).toLocaleString();
          } else {
            return firmwareInfo.releasedate;
          }
        };

        return (
          <div className='info-wrapper'>
            <h2 className='info__title'>固件信息</h2>
            <ul className='info__list'>
              <li>
                <b>设备: </b>
                <span>{ this.props.device + ' (' + this.props.deviceId + ')' }</span>
              </li>
              <li>
                <b>版本: </b>
                <span>{ firmwareInfo.version }</span>
              </li>
              <li>
                <b>BuildID: </b>
                <span>{ firmwareInfo.buildid }</span>
              </li>
              <li>
                <b>发布日期: </b>
                <span>{ getReleaseDate() }</span>
              </li>
              <li>
                <b>文件大小: </b>
                <span>{ (firmwareInfo.size / (1024 * 1024 * 1024)).toFixed(2) + ' GB' }</span>
              </li>
              <li>
                <b>MD5sum: </b>
                <span><code>{ firmwareInfo.md5sum }</code></span>
              </li>
              <li>
                <b>SHA1sum: </b>
                <span><code>{ firmwareInfo.sha1sum }</code></span>
              </li>
            </ul>
            <div className={ signBoxClasses }>
              <SignBox signed={ firmwareInfo.signed } />
            </div>
            <br />
            <a href={ firmwareInfo.url } target='_blank'>
              <Button amSize='xl' amStyle='success'><Icon icon='cloud-download' /> 下载</Button>
            </a>
          </div>
        );
      } else {
        return null;
      }
    }.bind(this);

    return (
      <div className='FirmwareInfo'>
        { getDetails() }
      </div>
    );
  }
});

module.exports = FirmwareInfo;