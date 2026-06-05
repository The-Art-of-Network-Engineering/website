---
title: "Learning Linux and my First Ansible Playbook"
slug: "learning-linux-and-my-first-ansible-playbook"
publishedAt: "2021-06-14"
excerpt: "So Linux has never been my daily driver until a few months ago. Now it's my daily driver for work and home and with that I'm learning a lot and since you can use a lot of the applications in conjunction with each other..."
author: "Andy Lapteff"
---

So Linux has never been my daily driver until a few months ago. Now it's my daily driver for work and home and with that I'm learning a lot and since you can use a lot of the applications in conjunction with each other with piping and what not. So in essence, learning one new tool or application can open up unseen possibilities in other tools.

The coolest command I learned this past week is watch. In my day job I'm often deploying tools that create logs, like Zeek, and I'd often ls or ll to see if I was having logs created or if the conn.log was getting bigger. Enter watch, simply run any command as you normally would and '<ctrl> a' and add watch to the beginning of the command. Doing this, you get your normal output but it updates every two seconds and if any values change they will change within the output. I found myself using this command again when I was monitoring my kubenertes cluster, instead of 'kube get pods' I'm now typing watch 'kube get pods.' I'd have it open like a dashboard when deploying or troubleshooting pods.

Then later on in the work week I started having an issue with trying to track time on all of my devices. I surmised that when time got too far off one of my applications would begin to fail. My first attempt was a bash script that simply ssh'd to each device and ran the time command. But by the time I got to the 8th or 9th device, since I was putting in the password, I wasn't really getting the result I was looking for. So if you got a hammer use it on everything right?! I ended having 10+ windows open, all small and organized on my desktop running 'watch timedatect' and I would watch the timing of my devices slowly drift and in due time, prove my hypothesis.

Then came the weekend, and I started looking into ansible. I found an example where they had used one command to connect to and check the time of all the devices in their inventory file. This really perked my interest. Could I have found a tool even cooler than watch in less than a week?!

Interlude: I installed gns3 and started a small topology of cumulus Linux devices to go on this ansible adventure. I'm not going to dive too far into the specifics of the playbook as far as indention or how to or where to put vars as the documentation is really good. Google is your friend here. I'm just here to walk through [my first playbook](https://gitlab.com/hugofthunder/cumulus_lab/-/blob/main/enable_RESTAPI.yml) :)

![](/blog-images/learning-linux-and-my-first-ansible-playbook/E3tHUt3UcAIuH5L.jpg)

The first thing I did when starting this adventure into my first interaction with ansible was creating an [inventory file](https://gitlab.com/hugofthunder/cumulus_lab/-/blob/main/ansible.hosts):

```
[atlanta]
spine01 ansible_host=192.168.49.3
spine02 ansible_host=192.168.49.4
leaf01 ansible_host=192.168.49.5
leaf02 ansible_host=192.168.49.6
leaf03 ansible_host=192.168.49.7

[atlanta:vars]
ansible_user=cumulus
ansible_python_interpreter=/usr/bin/python
```

Next I used ssh-keygen and shipped a public key to all the devices in my topology so I could connect without username:password. A quick google search of ssh-keygen will get you squared away in no time. This is all what's needed to do what I was trying to do at work earlier in the week, check the time on all my devices:

```
ansible all -a "date"
leaf01 | CHANGED | rc=0 >>
Sun 13 Jun 2021 12:37:15 AM UTC
leaf02 | CHANGED | rc=0 >>
Sun 13 Jun 2021 12:37:15 AM UTC
spine01 | CHANGED | rc=0 >>
Sun 13 Jun 2021 12:37:15 AM UTC
leaf03 | CHANGED | rc=0 >>
Sun 13 Jun 2021 12:37:15 AM UTC
spine02 | CHANGED | rc=0 >>
Sun 13 Jun 2021 12:37:15 AM UTC
```

Since I'm trying to learn automation I began to brainstorm what could my first ansible playbook do?! A playbook is simply a series of tasks rather than just running one task like illustrated above. To do this I followed along with the [cumulus documentation](https://docs.nvidia.com/networking-ethernet-software/cumulus-linux-43/System-Configuration/HTTP-API/) and did one of my switches manually so I understood the steps and what was needed to accomplish this task. In short, here are the main things my ansible playbook needs to do:

- edit two lines of a conf file
- enable and start two services

Let's try to go line by line-ish on what's happening in my playbook.

```
---
- hosts: all
```

I guess the beginning of all yaml files, of which the playbook is, starts with a '---' and the second line is saying that I want to run what follows and all the things in my inventory file.

```
  become: yes
  vars:
    conf_path: /etc/nginx/sites-available/nginx-restapi.conf
```

Become with the switch to yes is saying that you want to be root and on the next line i'm declaring the value of the variable conf\_path which I'll call later in the playbook.

```
  tasks:
    - name: edit the nginx-restapi.conf file
      replace:
        path: "{{ conf_path }}"
        regexp: 'listen localhost:8080 ssl;'
        replace: '# listen localhost:8080 ssl;'
```

Here is the first task, of which you can name whatever you want. In path, I call the variable above and then I do a regex search and then replace with the last line. The goal of this task is to comment out a line.

```
    - name: edit another line from file
      replace:
        path: "{{ conf_path }}"
        regexp: '# listen \[::]:8080 ipv6only=off ssl;'
        replace: 'listen [::]:8080 ipv6only=off ssl;'
```

In this task I'm trying to uncomment a line. I also had to escape the [::] in the regex search, which tripped me up for a bit.

```
    - name: enable nginx service
      ansible.builtin.service:
        name: nginx
        enabled: yes
    - name: start nginx service
      ansible.builtin.service:
        name: nginx
        state: started
    - name: enable restserver
      ansible.builtin.service:
        name: restserver
        enabled: yes
    - name: start restserver
      ansible.builtin.service:
        name: restserver
        state: started
```

The rest of the playbook is just enabling and starting the needed services as speechified in the cumulus linux documentation. All together [the playbook](https://gitlab.com/hugofthunder/cumulus_lab/-/blob/main/enable_RESTAPI.yml) looks like the following, of which, with all yaml files indentation is very important.

```
---
- hosts: all
  become: yes
  vars:
    conf_path: /etc/nginx/sites-available/nginx-restapi.conf
  tasks:
    - name: edit the nginx-restapi.conf file
      replace:
        path: "{{ conf_path }}"
        regexp: 'listen localhost:8080 ssl;'
        replace: '# listen localhost:8080 ssl;'
    - name: edit another line from file
      replace:
        path: "{{ conf_path }}"
        regexp: '# listen \[::]:8080 ipv6only=off ssl;'
        replace: 'listen [::]:8080 ipv6only=off ssl;'
    - name: enable nginx service
      ansible.builtin.service:
        name: nginx
        enabled: yes
    - name: start nginx service
      ansible.builtin.service:
        name: nginx
        state: started
    - name: enable restserver
      ansible.builtin.service:
        name: restserver
        enabled: yes
    - name: start restserver
      ansible.builtin.service:
        name: restserver
        state: started
```

To further improve this playbook, while it does work, I'll build in some checks to verify everything is working as it should so you don't have to do it after the playbook runs. To run the playbook I use the following command:

```
ansible-playbook enable_RESTAPI.yml --ask-become-pass
```

I use the --ask-become-pass so that I can enter in the root password for the devices instead of me hard coding them as a var or something. There maybe another way but today that is where we stand.

Thanks for hanging out with me and going through my very first ansible playbook journey. I'll leave you with the verification that the REST service is working on the cumulus device, till next time!

```
$ curl -X POST -k -u cumulus -d '{"cmd": "show interface json"}' https://192.168.49.4:8080/nclu/v1/rpc | jq
Enter host password for user 'cumulus':
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  4373  100  4343  100    30  12268     84 --:--:-- --:--:-- --:--:-- 12353
{
  "bridge": {
    "iface_obj": {
      "lldp": null,
      "native_vlan": null,
      "dhcp_enabled": false,
      "description": "",
      "vlan": [
        {
          "vlan": 10
        }
      ],
      "asic": null,
      "mtu": 9216,
      "lacp": {
        "rate": "",
        "sys_priority": "",
        "partner_mac": "",
        "bypass": ""
      },
      "mac": "0c:b0:0e:37:ae:01",
      "vlan_filtering": true,
      "min_links": "",
      "members": {},
      "counters": {
        "RX_ERR": 0,
        "TX_ERR": 0,
        "RX_OVR": 0,
        "TX_OVR": 0,
        "TX_OK": 229,
        "MTU": 9216,
        "Flg": "BMRU",
        "TX_DRP": 0,
        "RX_OK": 540,
        "RX_DRP": 0
      },
      "ip_address": {
        "allentries": []
      },
      "vlan_list": "10",
      "ip_neighbors": null
    },
    "linkstate": "UP",
    "summary": "",
    "connector_type": "Unknown",
    "mode": "Bridge/L2",
    "speed": "N/A"
  },
  "vlan10": {
    "iface_obj": {
      "lldp": null,
      "native_vlan": null,
      "dhcp_enabled": false,
      "description": "",
      "vlan": null,
      "asic": null,
      "mtu": 9216,
      "lacp": {
        "rate": "",
        "sys_priority": "",
        "partner_mac": "",
        "bypass": ""
      },
      "mac": "0c:b0:0e:37:ae:01",
      "vlan_filtering": false,
      "min_links": "",
      "members": {},
      "counters": {
        "RX_ERR": 0,
        "TX_ERR": 0,
        "RX_OVR": 0,
        "TX_OVR": 0,
        "TX_OK": 208,
        "MTU": 9216,
        "Flg": "BMRU",
        "TX_DRP": 0,
        "RX_OK": 540,
        "RX_DRP": 0
      },
      "ip_address": {
        "allentries": [
          "192.168.49.4/24"
        ]
      },
      "vlan_list": [],
      "ip_neighbors": {
        "ipv4": [
          "02:42:b3:6f:5f:9b",
          "0c:b0:0e:07:88:01"
        ],
        "ipv6": []
      }
    },
    "linkstate": "UP",
    "summary": "IP: 192.168.49.4/24",
    "connector_type": "Unknown",
    "mode": "Interface/L3",
    "speed": "N/A"
  },
  "lo": {
    "iface_obj": {
      "lldp": null,
      "native_vlan": null,
      "dhcp_enabled": false,
      "description": "",
      "vlan": null,
      "asic": null,
      "mtu": 65536,
      "lacp": {
        "rate": "",
        "sys_priority": "",
        "partner_mac": "",
        "bypass": ""
      },
      "mac": "00:00:00:00:00:00",
      "vlan_filtering": false,
      "min_links": "",
      "members": {},
      "counters": {
        "RX_ERR": 0,
        "TX_ERR": 0,
        "RX_OVR": 0,
        "TX_OVR": 0,
        "TX_OK": 3393,
        "MTU": 65536,
        "Flg": "LRU",
        "TX_DRP": 0,
        "RX_OK": 3393,
        "RX_DRP": 0
      },
      "ip_address": {
        "allentries": [
          "127.0.0.1/8",
          "::1/128"
        ]
      },
      "vlan_list": [],
      "ip_neighbors": null
    },
    "linkstate": "UP",
    "summary": "IP: 127.0.0.1/8, ::1/128",
    "connector_type": "Unknown",
    "mode": "Loopback",
    "speed": "N/A"
  },
  "mgmt": {
    "iface_obj": {
      "lldp": null,
      "native_vlan": null,
      "dhcp_enabled": false,
      "description": "",
      "vlan": null,
      "asic": null,
      "mtu": 65536,
      "lacp": {
        "rate": "",
        "sys_priority": "",
        "partner_mac": "",
        "bypass": ""
      },
      "mac": "8a:9d:94:9a:3f:8f",
      "vlan_filtering": false,
      "min_links": "",
      "members": {},
      "counters": {
        "RX_ERR": 0,
        "TX_ERR": 0,
        "RX_OVR": 0,
        "TX_OVR": 0,
        "TX_OK": 0,
        "MTU": 65536,
        "Flg": "OmRU",
        "TX_DRP": 13,
        "RX_OK": 0,
        "RX_DRP": 0
      },
      "ip_address": {
        "allentries": [
          "127.0.0.1/8",
          "::1/128"
        ]
      },
      "vlan_list": [],
      "ip_neighbors": null
    },
    "linkstate": "UP",
    "summary": "IP: 127.0.0.1/8, ::1/128",
    "connector_type": "Unknown",
    "mode": "VRF",
    "speed": "N/A"
  },
  "swp1": {
    "iface_obj": {
      "lldp": [
        {
          "adj_port": "swp3",
          "adj_mac": "0c:b0:0e:07:88:00",
          "adj_mgmt_ip4": "192.168.49.2",
          "adj_mgmt_ip6": "fe80::eb0:eff:fe07:8801",
          "adj_hostname": "JumpSwitch",
          "capabilities": [
            [
              "Bridge",
              "on"
            ],
            [
              "Router",
              "on"
            ]
          ],
          "adj_ttl": "120",
          "system_descr": "Cumulus Linux version 4.3.0 running on QEMU Standard PC (i440FX + PIIX, 1996)"
        }
      ],
      "native_vlan": 10,
      "dhcp_enabled": false,
      "description": "",
      "vlan": [
        {
          "vlan": 10,
          "flags": [
            "PVID",
            "Egress Untagged"
          ]
        }
      ],
      "asic": null,
      "mtu": 9216,
      "lacp": {
        "rate": "",
        "sys_priority": "",
        "partner_mac": "",
        "bypass": ""
      },
      "mac": "0c:b0:0e:37:ae:01",
      "vlan_filtering": true,
      "min_links": "",
      "members": {},
      "counters": {
        "RX_ERR": 0,
        "TX_ERR": 0,
        "RX_OVR": 0,
        "TX_OVR": 0,
        "TX_OK": 322,
        "MTU": 9216,
        "Flg": "BMRU",
        "TX_DRP": 0,
        "RX_OK": 2318,
        "RX_DRP": 0
      },
      "ip_address": {
        "allentries": []
      },
      "vlan_list": "10",
      "ip_neighbors": null
    },
    "linkstate": "UP",
    "summary": "Master: bridge(UP)",
    "connector_type": "Unknown",
    "mode": "Access/L2",
    "speed": "1G"
  },
  "eth0": {
    "iface_obj": {
      "lldp": null,
      "native_vlan": null,
      "dhcp_enabled": false,
      "description": "",
      "vlan": null,
      "asic": null,
      "mtu": 1500,
      "lacp": {
        "rate": "",
        "sys_priority": "",
        "partner_mac": "",
        "bypass": ""
      },
      "mac": "0c:b0:0e:37:ae:00",
      "vlan_filtering": false,
      "min_links": "",
      "members": {},
      "counters": {
        "RX_ERR": 0,
        "TX_ERR": 0,
        "RX_OVR": 0,
        "TX_OVR": 0,
        "TX_OK": 0,
        "MTU": 1500,
        "Flg": "BMU",
        "TX_DRP": 0,
        "RX_OK": 0,
        "RX_DRP": 0
      },
      "ip_address": {
        "allentries": []
      },
      "vlan_list": [],
      "ip_neighbors": null
    },
    "linkstate": "DN",
    "summary": "Master: mgmt(UP)",
    "connector_type": "Unknown",
    "mode": "Mgmt",
    "speed": "1G"
  }
}
```
