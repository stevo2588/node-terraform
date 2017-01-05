module "master_node" {
    source = "modules/vb_instance"
    name = "master-node"
}

module "node_pool" {
    source = "modules/vb_instance"
    instances = 2
}
