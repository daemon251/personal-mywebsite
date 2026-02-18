import WorkshopMetadataExtract as WME
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
parent_dir2 = os.path.dirname(parent_dir)

file = open(parent_dir2 + "\\CREDENTIALS-DO-NOT-SHARE\\steamwebapi.txt") #folder for credentials appears in same level as website root (public_html)
key = file.readline()
file.close()

WME.set_api_key(key)

#downloads

item_drp = WME.WorkshopItem("https://steamcommunity.com/sharedfiles/filedetails/?id=3275477271")
item_fdn = WME.WorkshopItem("https://steamcommunity.com/sharedfiles/filedetails/?id=3484425750")
item_htr = WME.WorkshopItem("https://steamcommunity.com/sharedfiles/filedetails/?id=3340865413")

print("drp " + str(item_drp.get_subscriptions()))
print("fdn " + str(item_fdn.get_subscriptions()))
print("htr " + str(item_htr.get_subscriptions()))

exit(0)