variable "cpus"   { default = 1 }
variable "memory" { default = "1024mib" }
variable "name" { default = "" }
variable "instances" { default = 1 }

resource "virtualbox_vm" "node" {
    image = "ubuntu-15.04.tar.xz"
    cpus = "${var.cpus}"
    memory = "${var.memory}"
    count = "${var.instances}"
    # name = "${var.name}"
    name = "${var.name == "" ? format("node-%02d", count.index+1) : var.name}"

    user_data = "${file("modules/vb_instance/terraform_vb_user_data")}"

    network_adapter {
        type = "nat"
    }

    network_adapter {
        type = "bridged"
        host_interface = "wlxc86000d48f66"
    }
}

output "IPAddr" {
    value = "${element(virtualbox_vm.node.*.network_adapter.1.ipv4_address, 1)}"
}