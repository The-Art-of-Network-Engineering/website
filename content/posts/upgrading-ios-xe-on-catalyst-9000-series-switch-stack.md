---
title: "Upgrading IOS-XE on Catalyst 9000 series Switch Stack"
slug: "upgrading-ios-xe-on-catalyst-9000-series-switch-stack"
publishedAt: "2020-09-07"
excerpt: "This article was originally written by A.J. Murray and first appeared on his blog noblinkyblinky.com"
author: "Andy Lapteff"
---

*This article was originally written by [A.J. Murray](https://twitter.com/noblinkyblinky) and first appeared on his blog [noblinkyblinky.com](https://blog.noblinkyblinky.com/2019/07/27/upgrading-ios-xe-on-catalyst-9000-series-switch-stack/)*

I recently had to put together a Catalyst 9300 stack of switches and upgrade the switch stack, so I thought I'd document the process and share it. The process is very similar to stacking other switches, if you're familiar with stacking Cisco switches. I believe there are some newer commands in IOS-XE that help facilitate and make the process a little easier than in previous versions of IOS.

## Copy the new IOS file over

As with any other IOS upgrade you have to get the files onto the switch stack. By default when you're working with a switch stack you're working on the stack master. Copy the file to the switch stack using copy tftp bootflash: <filename>. In this case I installing IOS-XE Fuji 16.9.3. You'll be prompted to enter in the IP Address of your TFTP server - which could simply be your laptop running [tftpd](http://tftpd32.jounin.net/tftpd32_download.html).

```
copy tftp flash:cat9k_iosxe.16.09.03.SPA.bin
```

## Sync the file to all the Switches in the Stack

Now traditionally you'd have to copy the bin files over to all of the switches in the stack. However, in this case we use a command to help us with that - install add file <filename>

```
C9300-STACK#install add file flash:cat9k_iosxe.16.09.03.SPA.bin
```

```
! The following is output from the command  
 install_add: START Tue Jul 23 14:19:09 EDT 2019
```

```
*Jul 23 18:19:10.806: %IOSXE-5-PLATFORM: Switch 1 R0/0: Jul 23 14:19:10 install_engine.sh: %INSTALL-5-INSTALL_START_INFO: Started install add flash:cat9k_iosxe.16.09.03.SPA.bin
```

```
install_add: Adding PACKAGE
```

```
--- Starting initial file syncing ---  
 [1]: Copying flash:cat9k_iosxe.16.09.03.SPA.bin from switch 1 to switch 2  
 [2]: Finished copying to switch 2  
 Info: Finished copying flash:cat9k_iosxe.16.09.03.SPA.bin to the selected switch(es)  
 Finished initial file syncing
```

```
--- Starting Add ---  
 Performing Add on all members  
   [1] Add package(s) on switch 1  
   [1] Finished Add on switch 1  
   [2] Add package(s) on switch 2  
   [2] Finished Add on switch 2  
 Checking status of Add on [1 2]  
 Add: Passed on [1 2]  
 Finished Add
```

```
SUCCESS: install_add  Tue Jul 23 14:21:21 EDT 2019
```

Install add takes the file and copies it to bootflash on all of the switches in the switch stack. In this case there was only one additional switch, switch 2.

## Activate the Software

Next we'll use install activate to unpack the bin files and add them to the boot config. Once this operation completes you'll get prompted to reboot the switch stack.

`C9300-STACK#install activate  
 install_activate: START Tue Jul 23 14:25:01 EDT 2019  
 install_activate: Activating PACKAGE`

`*Jul 23 18:25:03.046: %IOSXE-5-PLATFORM: Switch 1 R0/0: Jul 23 14:25:03 install_engine.sh: %INSTALL-5-INSTALL_START_INFO: Started install activateFollowing packages shall be activated:  
 /flash/cat9k-wlc.16.09.03.SPA.pkg  
 /flash/cat9k-webui.16.09.03.SPA.pkg  
 /flash/cat9k-srdriver.16.09.03.SPA.pkg  
 /flash/cat9k-sipspa.16.09.03.SPA.pkg  
 /flash/cat9k-sipbase.16.09.03.SPA.pkg  
 /flash/cat9k-rpboot.16.09.03.SPA.pkg  
 /flash/cat9k-rpbase.16.09.03.SPA.pkg  
 /flash/cat9k-guestshell.16.09.03.SPA.pkg  
 /flash/cat9k-espbase.16.09.03.SPA.pkg  
 /flash/cat9k-cc_srdriver.16.09.03.SPA.pkg`

`This operation requires a reload of the system. Do you want to proceed? [y/n]`

## Switch upgrade complete!

Upon reboot the switch stack will be upgraded. Use a show version to verify (verify all the things!) that the stack is running the new version. You can also clean up old IOS files that may be left over from the previous version using "install deactivate <filename.> For more detailed information and additional configuration options and examples check out the [Cisco documentation.](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/16-9/configuration_guide/sys_mgmt/b_169_sys_mgmt_9300_cg/software_maintenance_upgrade.pdf)
