import {
  Book,
  CreditCard,
  Group,
  UserScan,
  WarningWindow,
  HighPriority,
  User,
  Mirror,
  ReportColumns
} from "iconoir-react";
import { useContext } from "react";
import { DataContextLogin } from "../context/Context";
import RolesEnum from "../enums/Role";
import NavIcon from "./NavIcon";

export default function HomeMenu() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <div className="w-full">
      <div className="w-full lg:h-600 flex h-auto flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full h-1/4 lg:h-full bg-homeMenuBg bg-cover"></div>
        <div className="lg:w-1/2 w-full h-3/4 lg:h-full flex items-center">
          <div className="w-full h-fit flex justify-center items-center flex-wrap gap-y-6">
            <NavIcon
              route="/kardex"
              text="Kardex"
              icon={
                <Book
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
            <NavIcon
              route="/credencial"
              text="Credencial"
              icon={
                <CreditCard
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
            <NavIcon
              route="/publicaciones"
              text="Publicaciones"
              icon={
                <Group
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
            <NavIcon
              route="/eventos"
              text="Eventos"
              icon={
                <UserScan
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
            <NavIcon
              route="/avisos"
              text="Avisos"
              icon={
                <WarningWindow
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
            {
              dataUser.role.name == RolesEnum[2] ?
              <NavIcon
              route="/usuarios"
              text="Usuarios"
              icon={
                <User
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
              />
              :
              <NavIcon
              route="/inicio"
              text="Regularizaciones"
              icon={
                <HighPriority
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
              />
            }
            {
              dataUser.role.name == RolesEnum[2] &&
                <NavIcon
                route="/materias"
                text="Materias"
                icon={
                  <Mirror
                    className="m-auto"
                    width={75}
                    height={75}
                    color={"#ffff"}
                  />
                }
                style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
                />
            }
            <NavIcon
              route="/altasbajas"
              text="Atas y Bajas"
              icon={
                <HighPriority
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
             <NavIcon
              route="/menu"
              text="Mas..."
              icon={
                <ReportColumns
                  className="m-auto"
                  width={75}
                  height={75}
                  color={"#ffff"}
                />
              }
              style="bg-orangeLight w-40 m-4 text-base shadow-xl shadow-orangeLight hover:bg-oceanBlue hover:shadow-oceanBlue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
