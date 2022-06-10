import React from "react";
import {
  Panel,
  Spinner,
  PanelHeader,
  View,
  Group,
  CardGrid,
  Card,
  SimpleCell,
  Switch,
  SplitLayout,
  SplitCol,
  InfoRow,
  Header,
  Div,
  UsersStack,
  FormItem,
  Select,
  Button,
  CellButton,
  SizeType,
} from "@vkontakte/vkui";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../../../../GraphQL/Queries";
import quot from "../../../../img/quot.svg";

interface props {
  id: string;
  go: any;
}

const MyNote = ({ id, go }: props) => {
  const { loading: meLoading, data: meData } = useQuery(ME);
  console.log(meLoading, meData);
  const username = meData?.me.username;
  let sentence = null;
  let favoriteCount = null;
  let favoritedBy = null;
  let favoritedByAvatars = null;
  if (meData?.me.notes.length) {
    let note = meData?.me.notes[0];
    sentence = note.content;
    favoriteCount = note.favoriteCount;
    favoritedBy = note.favoritedBy;
    favoritedByAvatars = [
      "https://picsum.photos/300/300/",
      "https://picsum.photos/seed/300/300/",
      "https://picsum.photos/id/1/300/300/",
      "https://picsum.photos/id/2/300/300/",
      "https://picsum.photos/id/3/300/300/",
      "https://picsum.photos/id/4/300/300/",
      "https://picsum.photos/id/5/300/300/",
      "https://picsum.photos/id/6/300/300/",
      "https://picsum.photos/id/7/300/300/",
    ]; // temp array
  }
  const themes = [
    { label: "как в ВК", value: "auto" },
    { label: "светлая", value: "light" },
    { label: "тёмная", value: "dark" },
  ];

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader>my sent.</PanelHeader>
        <Group>
          <Header mode="secondary">Настройки</Header>
          <SimpleCell
            disabled
            after={
              <FormItem>
                <Select
                  // зафиксировать размер, убрать отступ справа
                  defaultValue={"auto"}
                  defaultChecked={true}
                  options={themes}
                />
              </FormItem>
            }
          >
            Тема
          </SimpleCell>
          <SimpleCell
            disabled // временно
            after={<Switch disabled aria-label="Уведомления о респектах" />}
          >
            Уведомления о респектах
          </SimpleCell>
          <SimpleCell
            disabled // временно
            after={<Switch disabled aria-label="Уведомления об ответах" />}
          >
            Уведомления об ответах
          </SimpleCell>
        </Group>
        {!meLoading ? (
          sentence != null ? (
            <Group
              mode="plain"
              header={<Header mode="secondary">Фраза</Header>}
            >
              <CardGrid size="l">
                <Card mode="shadow">
                  <img
                    src={quot}
                    alt="Quotation mark"
                    style={{
                      width: "25px",
                      float: "left",
                      marginLeft: "10px",
                      marginRight: "10px",
                      marginTop: "5px",
                    }}
                  />
                  <blockquote style={{ minHeight: "2rem", paddingTop: "5px" }}>
                    {sentence}
                  </blockquote>
                </Card>
              </CardGrid>
              <SplitLayout style={{ justifyContent: "center" }}>
                <SplitCol>
                  <Div>
                    <InfoRow header="Просмотры фразы">...</InfoRow>
                  </Div>
                </SplitCol>
                <SplitCol>
                  <Div>
                    <InfoRow header="Просмотры профиля">...</InfoRow>
                  </Div>
                </SplitCol>
              </SplitLayout>
              <SimpleCell before={"Респекты: " + favoriteCount}>
                <UsersStack
                  style={{ marginLeft: "1em" }}
                  photos={favoritedByAvatars || undefined}
                  size="m"
                />
              </SimpleCell>
              <SimpleCell>Ответы (временно не работают)</SimpleCell>
            </Group>
          ) : (
            <Group
              mode="plain"
              header={<Header mode="secondary">Фраза</Header>}
            >
              <Button
                onClick={() => go("greeting")}
                mode="outline"
                style={{ marginLeft: 16 }}
              >
                Создать фразу
              </Button>
            </Group>
          )
        ) : (
          <Spinner />
        )}
        <Group>
          <a
            style={{ textDecoration: "none" }}
            href="//sent.bouhartsev.top/"
            target="_blank"
          >
            <CellButton>О sent.</CellButton>
          </a>
          <CellButton mode="danger">Удалить аккаунт (dev)</CellButton>
        </Group>
      </Panel>
    </View>
  );
};

export default MyNote;