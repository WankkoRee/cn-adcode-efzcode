import * as fs from "fs";
import {handle} from "./GB_T_2260";

export const main = () => {
    const raw = `
110000	北京市
110101	东城区
110102	西城区
110103	崇文区
110104	宣武区
110105	朝阳区
110106	丰台区
110107	石景山区
110108	海淀区
110109	门头沟区
110110	燕山区
110201	昌平县
110202	顺义县
110203	通县
110204	大兴县
110205	房山县
110206	平谷县
110207	怀柔县
110208	密云县
110209	延庆县
120000	天津市
120101	和平区
120102	河东区
120103	河西区
120104	南开区
120105	河北区
120106	红桥区
120107	塘沽区
120108	汉沽区
120109	大港区
120110	东郊区
120111	西郊区
120112	南郊区
120113	北郊区
120201	宁河县
120202	武清县
120203	静海县
120204	宝坻县
120205	蓟县
130000	河北省
130100	石家庄市
130102	长安区
130103	桥东区
130104	桥西区
130105	新华区
130106	郊区
130107	井陉矿区
130200	唐山市
130202	路南区
130203	路北区
130204	东矿区
130205	开平区
130206	新区
132100	邯郸地区
132101	邯郸市
132102	邯山区
132103	丛台区
132104	复兴区
132105	郊区
132106	峰峰矿区
132121	大名县
132122	魏县
132123	曲周县
132124	丘县
132125	鸡泽县
132126	肥乡县
132127	广平县
132128	成安县
132129	临漳县
132130	磁县
132131	武安县
132132	涉县
132133	永年县
132134	邯郸县
132135	馆陶县
132200	邢台地区
132201	邢台市
132202	桥东区
132203	桥西区
132204	郊区
132221	邢台县
132222	沙河县
132223	临城县
132224	内丘县
132225	柏乡县
132226	隆尧县
132227	任县
132228	南和县
132229	宁晋县
132230	南宫县
132231	巨鹿县
132232	新河县
132233	广宗县
132234	平乡县
132235	威县
132236	清河县
132237	临西县
132300	石家庄地区
132321	束鹿县
132322	晋县
132323	深泽县
132324	无极县
132325	藁城县
132326	赵县
132327	栾城县
132328	正定县
132329	新乐县
132330	高邑县
132331	元氏县
132332	赞皇县
132333	井陉县
132334	获鹿县
132335	平山县
132336	灵寿县
132337	行唐县
132400	保定地区
132401	保定市
132402	新市区
132403	北市区
132404	南市区
132405	郊区
132421	易县
132422	满城县
132423	徐水县
132424	涞源县
132425	定兴县
132426	完县
132427	唐县
132428	望都县
132429	涞水县
132430	涿县
132431	清苑县
132432	高阳县
132433	安新县
132434	雄县
132435	容城县
132436	新城县
132437	曲阳县
132438	阜平县
132439	定县
132440	安国县
132441	博野县
132442	蠡县
132500	张家口地区
132501	张家口市
132502	桥东区
132503	桥西区
132504	茶坊区
132505	宣化区
132506	下花园区
132507	庞家堡区
132521	张北县
132522	康保县
132523	沽源县
132524	尚义县
132525	蔚县
132526	阳原县
132527	怀安县
132528	万全县
132529	怀来县
132530	涿鹿县
132531	宣化县
132532	赤城县
132533	崇礼县
132600	承德地区
132601	承德市
132602	双桥区
132603	双滦区
132604	鹰手营子矿区
132621	青龙县
132622	宽城县
132623	兴隆县
132624	平泉县
132625	承德县
132626	滦平县
132627	丰宁县
132628	隆化县
132629	围场县
132700	唐山地区
132701	秦皇岛市
132702	海港区
132703	山海关区
132704	北戴河区
132705	郊区
132721	丰润县
132722	丰南县
132723	滦县
132724	滦南县
132725	乐亭县
132726	昌黎县
132727	抚宁县
132728	卢龙县
132729	迁安县
132730	迁西县
132731	遵化县
132732	玉田县
132800	廊坊地区
132801	廊坊市
132821	三河县
132822	大厂回族自治县
132823	香河县
132824	安次县
132825	永清县
132826	固安县
132827	霸县
132828	文安县
132829	大城县
132900	沧州地区
132901	沧州市
132902	新华区
132903	运河区
132904	郊区
132921	沧县
132922	河间县
132923	肃宁县
132924	献县
132925	交河县
132926	吴桥县
132927	东光县
132928	南皮县
132929	盐山县
132930	黄骅县
132931	孟村回族自治县
132932	青县
132933	任丘县
132934	海兴县
133000	衡水地区
133021	衡水县
133022	冀县
133023	枣强县
133024	武邑县
133025	深县
133026	武强县
133027	饶阳县
133028	安平县
133029	故城县
133030	景县
133031	阜城县
140000	山西省
140100	太原市
140102	南城区
140103	北城区
140104	河西区
140111	古交工矿区
140112	南郊区
140113	北郊区
140121	清徐县
140122	阳曲县
140123	娄烦县
140200	大同市
140202	城区
140203	矿区
140211	南郊区
140212	新荣区
140300	阳泉市
140302	城区
140303	矿区
140311	郊区
140400	长治市
140402	城区
140411	郊区
142100	雁北地区
142121	大同县
142122	阳高县
142123	天镇县
142124	广灵县
142125	灵丘县
142126	浑源县
142127	怀仁县
142128	应县
142129	山阴县
142130	朔县
142131	平鲁县
142132	左云县
142133	右玉县
142200	忻县地区
142221	忻县
142222	原平县
142223	代县
142224	繁峙县
142225	五台县
142226	定襄县
142227	静乐县
142228	岢岚县
142229	保德县
142230	五寨县
142231	河曲县
142232	偏关县
142233	神池县
142234	宁武县
142300	晋中地区
142301	榆次市
142321	榆次县
142322	寿阳县
142323	盂县
142324	平定县
142325	昔阳县
142326	和顺县
142327	左权县
142328	榆社县
142329	太谷县
142330	祁县
142331	平遥县
142332	介休县
142333	灵石县
142400	吕梁地区
142421	离石县
142422	孝义县
142423	兴县
142424	交口县
142425	方山县
142426	石楼县
142427	岚县
142428	中阳县
142429	交城县
142430	临县
142431	文水县
142432	柳林县
142433	汾阳县
142500	晋东南地区
142521	长治县
142522	潞城县
142523	襄垣县
142524	武乡县
142525	黎城县
142526	平顺县
142527	壶关县
142528	陵川县
142529	高平县
142530	晋城县
142531	阳城县
142532	沁水县
142533	长子县
142534	屯留县
142535	沁源县
142536	沁县
142600	临汾地区
142601	临汾市
142602	侯马市
142621	临汾县
142622	隰县
142623	汾西县
142624	永和县
142625	安泽县
142626	洪洞县
142627	古县
142628	霍县
142629	翼城县
142630	浮山县
142631	曲沃县
142632	襄汾县
142633	吉县
142634	乡宁县
142635	大宁县
142636	蒲县
142700	运城地区
142721	运城县
142722	夏县
142723	闻喜县
142724	绛县
142725	垣曲县
142726	平陆县
142727	芮城县
142728	永济县
142729	临猗县
142730	万荣县
142731	新绛县
142732	稷山县
142733	河津县
150000	内蒙古自治区
150100	呼和浩特市
150102	新城区
150103	回民区
150104	玉泉区
150105	郊区
150121	土默特左旗
150122	托克托县
150200	包头市
150202	东河区
150203	昆都仑区
150204	青山区
150205	石拐矿区
150206	白云矿区
150207	郊区
150221	土默特右旗
150222	固阳县
150300	乌海市
150302	海勃湾区
150303	海南区
150304	乌达区
152100	呼伦贝尔盟
152101	海拉尔市
152102	满洲里市
152121	布特哈旗
152122	阿荣旗
152123	莫力达瓦达斡尔族自治旗
152124	喜桂图旗
152125	额尔古纳右旗
152126	额尔古纳左旗
152127	鄂伦春自治旗
152128	鄂温克族自治旗
152129	新巴尔虎右旗
152130	新巴尔虎左旗
152131	陈巴尔虎旗
152200	兴安盟
152201	乌兰浩特市
152221	科尔沁右翼前旗
152222	科尔沁右翼中旗
152223	扎赉特旗
152224	突泉县
152300	哲里木盟
152301	通辽市
152321	通辽县
152322	科尔沁左翼中旗
152323	科尔沁左翼后旗
152324	开鲁县
152325	库伦旗
152326	奈曼旗
152327	扎鲁特旗
152400	昭乌达盟
152401	赤峰市
152421	赤峰县
152422	巴林左旗
152423	巴林右旗
152424	林西县
152425	克什克腾旗
152426	翁牛特旗
152428	喀喇沁旗
152429	宁城县
152430	敖汉旗
152431	阿鲁科尔沁旗
152500	伊克昭盟
152521	东胜县
152522	达拉特旗
152523	准格尔旗
152524	鄂托克前旗
152525	鄂托克旗
152526	杭锦旗
152527	乌审旗
152528	伊金霍洛旗
152600	锡林郭勒盟
152601	二连浩特市
152621	阿巴哈纳尔旗
152622	阿巴嘎旗
152623	苏尼特左旗
152624	苏尼特右旗
152625	东乌珠穆沁旗
152626	西乌珠穆沁旗
152627	太仆寺旗
152628	镶黄旗
152629	正镶白旗
152630	正蓝旗
152631	多伦县
152700	巴彦淖尔盟
152721	临河县
152722	五原县
152723	磴口县
152724	乌拉特前旗
152725	乌拉特中旗
152726	杭锦后旗
152727	乌拉特后旗
152800	乌兰察布盟
152801	集宁市
152821	武川县
152822	和林格尔县
152823	清水河县
152824	卓资县
152825	化德县
152826	商都县
152827	兴和县
152828	丰镇县
152829	凉城县
152830	察哈尔右翼前旗
152831	察哈尔右翼中旗
152832	察哈尔右翼后旗
152833	达尔罕茂明安联合旗
152834	四子王旗
152900	阿拉善盟
152921	阿拉善左旗
152922	阿拉善右旗
152923	额济纳旗
210000	辽宁省
210100	沈阳市
210102	和平区
210103	沈河区
210104	大东区
210105	皇姑区
210106	铁西区
210111	苏家屯区
210112	东陵区
210113	新城子区
210114	于洪区
210121	新民县
210122	辽中县
210200	大连市
210202	中山区
210203	西岗区
210204	沙河口区
210211	甘井子区
210212	旅顺口区
210221	金县
210222	新金县
210223	复县
210224	长海县
210225	庄河县
210300	鞍山市
210302	铁东区
210303	铁西区
210304	立山区
210311	郊区
210321	台安县
210322	海城县
210400	抚顺市
210402	新抚区
210403	露天区
210404	望花区
210411	郊区
210421	抚顺县
210422	新宾县
210423	清原县
210500	本溪市
210502	平山区
210503	溪湖区
210511	立新区
210521	本溪县
210522	桓仁县
210600	丹东市
210602	元宝区
210603	振兴区
210604	振安区
210621	凤城县
210622	岫岩县
210623	东沟县
210624	宽甸县
210700	锦州市
210702	古塔区
210703	凌河区
210711	郊区
210721	锦西县
210722	兴城县
210723	绥中县
210724	锦县
210725	北镇县
210726	黑山县
210727	义县
210800	营口市
210802	站前区
210803	西市区
210811	郊区
210821	营口县
210822	盘山县
210823	大洼县
210824	盖县
210900	阜新市
210902	海州区
210903	新邱区
210904	太平区
210911	郊区
210921	阜新蒙古族自治县
210922	彰武县
211000	辽阳市
211002	白塔区
211003	文圣区
211004	宏伟区
211011	郊区
211021	辽阳县
211022	灯塔县
212100	铁岭地区
212101	铁岭市
212102	铁法市
212121	铁岭县
212122	开原县
212123	西丰县
212124	昌图县
212125	康平县
212126	法库县
212200	朝阳地区
212201	朝阳市
212221	朝阳县
212222	建平县
212223	凌源县
212224	喀喇沁左翼蒙古族自治县
212225	建昌县
212226	北票县
220000	吉林省
220100	长春市
220102	南关区
220103	宽城区
220104	朝阳区
220105	二道河子区
220111	郊区
220121	榆树县
220122	农安县
220123	九台县
220124	德惠县
220125	双阳县
220200	吉林市
220202	昌邑区
220203	龙潭区
220204	船营区
220211	郊区
220221	永吉县
220222	舒兰县
220223	磐石县
220224	蛟河县
220225	桦甸县
222100	四平地区
222101	四平市
222102	辽源市
222121	怀德县
222122	梨树县
222123	伊通县
222124	东丰县
222125	双辽县
222200	通化地区
222201	通化市
222202	浑江市
222221	海龙县
222222	通化县
222223	柳河县
222224	辉南县
222225	集安县
222226	抚松县
222227	靖宇县
222228	长白朝鲜族自治县
222300	白城地区
222301	白城市
222321	扶余县
222322	洮安县
222323	长岭县
222324	前郭尔罗斯蒙古族自治县
222325	大安县
222326	镇赉县
222327	通榆县
222328	乾安县
222400	延边朝鲜族自治州
222401	延吉市
222402	图们市
222421	延吉县
222422	敦化县
222423	和龙县
222424	汪清县
222425	珲春县
222426	安图县
230000	黑龙江省
230100	哈尔滨市
230102	道里区
230103	南岗区
230104	道外区
230105	太平区
230106	香坊区
230107	动力区
230108	平房区
230200	齐齐哈尔市
230202	龙沙区
230203	建华区
230204	铁锋区
230205	昂昂溪区
230206	富拉尔基区
230207	华安区
230208	梅里斯区
230300	鸡西市
230302	鸡冠区
230303	恒山区
230304	滴道区
230305	梨树区
230306	城子河区
230307	麻山区
230400	大庆市
230402	萨尔图区
230403	龙凤区
230404	让胡路区
230405	红岗区
230406	大同区
230500	鹤岗市
230502	向阳区
230503	工农区
230504	南山区
230505	兴安区
230506	东山区
230507	兴山区
230600	双鸭山市
230602	尖山区
230603	岭东区
230604	岭西区
230605	四方台区
230606	宝山区
230700	伊春市
230702	伊春区
230703	南岔区
230704	友好区
230705	西林区
230706	翠峦区
230707	新青区
230708	美溪区
230709	大丰区
230710	五营区
230711	乌敏河区
230712	东风区
230713	带岭区
230714	乌伊岭区
230715	红星区
230716	上甘岭区
230721	铁力县
230722	嘉荫县
232100	绥化地区
232121	海伦县
232122	肇东县
232123	绥化县
232124	安达县
232125	望奎县
232126	兰西县
232127	青冈县
232128	肇源县
232129	肇州县
232130	庆安县
232131	明水县
232132	绥棱县
232200	松花江地区
232221	五常县
232222	双城县
232223	巴彦县
232224	呼兰县
232225	宾县
232226	阿城县
232227	尚志县
232228	木兰县
232229	延寿县
232230	通河县
232231	方正县
232300	嫩江地区
232321	讷河县
232322	拜泉县
232323	龙江县
232324	依安县
232325	克山县
232326	甘南县
232327	泰来县
232328	克东县
232329	富裕县
232330	林甸县
232331	杜尔伯特蒙古族自治县
232400	合江地区
232401	佳木斯市
232402	七台河市
232403	永红区
232404	向阳区
232405	前进区
232406	东风区
232411	郊区
232421	桦南县
232422	集贤县
232423	宝清县
232424	富锦县
232425	依兰县
232426	勃利县
232427	汤原县
232428	桦川县
232429	萝北县
232430	绥滨县
232431	饶河县
232432	同江县
232433	抚远县
232500	牡丹江地区
232501	牡丹江市
232502	东凤区
232503	先锋区
232504	爱民区
232505	阳明区
232511	郊区
232581	绥芬河市
232521	海林县
232522	宁安县
232523	林口县
232524	密山县
232525	穆棱县
232526	虎林县
232527	鸡东县
232528	东宁县
232600	黑河地区
232601	黑河市
232621	嫩江县
232622	北安县
232623	德都县
232624	爱辉县
232625	逊克县
232626	孙吴县
232700	大兴安岭地区
232721	呼玛县
232722	塔河县
232723	漠河县
310000	上海市
310101	黄浦区
310102	南市区
310103	卢湾区
310104	徐汇区
310105	长宁区
310106	静安区
310107	普陀区
310108	闸北区
310109	虹口区
310110	杨浦区
310111	吴淞区
310112	闵行区
310201	上海县
310202	嘉定县
310203	宝山县
310204	川沙县
310205	南汇县
310206	奉贤县
310207	松江县
310208	金山县
310209	青浦县
310210	崇明县
320000	江苏省
320100	南京市
320102	玄武区
320103	白下区
320104	秦淮区
320105	建邺区
320106	鼓楼区
320107	下关区
320111	浦口区
320112	大厂区
320113	栖霞区
320114	雨花区
320121	江宁县
320122	江浦县
320123	六合县
320200	无锡市
320202	崇安区
320203	南长区
320204	北塘区
320311	郊区
320300	徐州市
320302	鼓楼区
320303	云龙区
320304	矿区
320305	贾汪区
320400	常州市
320402	天宁区
320403	广化区
320404	钟楼区
320405	戚墅堰区
320500	苏州市
320502	沧浪区
320503	平江区
320504	金阊区
320600	南通市
320602	城中区
320603	港闸区
320611	郊区
320700	连云港市
320702	连云港区
320703	盐区
320704	新浦区
320705	海州区
320711	郊区
322100	徐州地区
322121	丰县
322122	沛县
322123	铜山县
322124	睢宁县
322125	邳县
322126	新沂县
322127	东海县
322128	赣榆县
322200	淮阴地区
322201	清江市
322221	淮阴县
322222	灌云县
322223	灌南县
322224	沭阳县
322225	宿迁县
322226	泗阳县
322227	涟水县
322228	泗洪县
322229	淮安县
322230	洪泽县
322231	盱眙县
322232	金湖县
322300	盐城地区
322321	响水县
322322	滨海县
322323	阜宁县
322324	射阳县
322325	建湖县
322326	盐城县
322327	大丰县
322328	东台县
322400	扬州地区
322401	扬州市
322402	泰州市
322421	兴化县
322422	高邮县
322423	宝应县
322424	靖江县
322425	泰兴县
322426	江都县
322427	邗江县
322428	泰县
322429	仪征县
322500	南通地区
322521	海安县
322522	如皋县
322523	如东县
322524	南通县
322525	海门县
322526	启东县
322600	镇江地区
322601	镇江市
322621	丹徒县
322622	武进县
322623	丹阳县
322624	句容县
322625	金坛县
322626	溧水县
322627	高淳县
322628	溧阳县
322629	宜兴县
322630	扬中县
322700	苏州地区
322721	江阴县
322722	无锡县
322723	沙洲县
322724	常熟县
322725	太仓县
322726	昆山县
322727	吴县
322728	吴江县
330000	浙江省
330100	杭州市
330102	上城区
330103	下城区
330104	江干区
330105	拱墅区
330106	西湖区
330107	半山区
330121	萧山县
330122	桐庐县
330123	富阳县
330124	临安县
330125	余杭县
330126	建德县
330127	淳安县
330200	宁波市
330202	镇明区
330203	海曙区
330204	江东区
330205	江北区
330300	温州市
330301	东城区
330302	南城区
330303	西城区
330321	洞头县
330322	永嘉县
330323	瑞安县
330324	文成县
330325	平阳县
330326	乐清县
330327	泰顺县
330328	瓯海县
330329	苍南县
332100	嘉兴地区
332101	湖州市
332102	嘉兴市
332122	嘉善县
332123	平湖县
332124	海宁县
332125	海盐县
332126	桐乡县
332127	德清县
332129	长兴县
332130	安吉县
332200	宁波地区
332221	慈溪县
332222	余姚县
332223	奉化县
332224	象山县
332225	宁海县
332226	鄞县
332227	镇海县
332300	绍兴地区
332301	绍兴市
332322	上虞县
332323	嵊县
332324	新昌县
332325	诸暨县
332500	金华地区
332501	金华市
332502	衢州市
332522	兰溪县
332523	永康县
332524	武义县
332525	东阳县
332526	义乌县
332527	浦江县
332529	常山县
332530	江山县
332531	开化县
332600	丽水地区
332621	丽水县
332622	青田县
332623	云和县
332624	龙泉县
332625	庆元县
332626	缙云县
332627	遂昌县
332700	台州地区
332701	椒江市
332721	临海县
332722	黄岩县
332723	温岭县
332724	仙居县
332725	天台县
332726	三门县
332727	玉环县
332800	舟山地区
332821	定海县
332822	普陀县
332823	岱山县
332824	嵊泗县
340000	安徽省
340100	合肥市
340102	东市区
340103	中市区
340104	西市区
340111	郊区
340121	长丰县
340200	芜湖市
340202	镜湖区
340203	马塘区
340204	新芜区
340205	裕溪口区
340206	四褐山区
340211	郊区
340221	芜湖县
340300	蚌埠市
340302	东市区
340303	中市区
340304	西市区
340311	郊区
340400	淮南市
340402	大通区
340403	田家庵区
340404	谢家集区
340405	八公山区
340406	潘集区
340421	凤台县
340500	马鞍山市
340502	金家庄区
340503	花山区
340504	雨山区
340505	向山区
340600	淮北市
340602	杜集区
340603	相山区
340604	烈山区
340611	郊区
340621	濉溪县
340700	铜陵市
340702	铜官山区
340703	狮子山区
340704	铜山区
340711	郊区
340721	铜陵县
340800	安庆市
340802	迎江区
340803	大观区
340811	郊区
342100	阜阳地区
342101	阜阳市
342121	阜阳县
342122	临泉县
342123	太和县
342124	涡阳县
342125	蒙城县
342126	亳县
342127	阜南县
342128	颍上县
342129	界首县
342130	利辛县
342200	宿县地区
342201	宿州市
342221	砀山县
342222	萧县
342223	宿县
342224	灵璧县
342225	泗县
342226	怀远县
342227	五河县
342228	固镇县
342300	滁县地区
342321	天长县
342322	来安县
342323	滁县
342324	全椒县
342325	定远县
342326	凤阳县
342327	嘉山县
342400	六安地区
342401	六安市
342421	六安县
342422	寿县
342423	霍邱县
340123	肥西县
342425	舒城县
342426	金寨县
342427	霍山县
342500	宣城地区
342521	宣城县
342522	郎溪县
342523	广德县
342524	宁国县
340521	当涂县
340222	繁昌县
340223	南陵县
340224	青阳县
342529	泾县
342600	巢湖地区
342621	肥东县
342622	庐江县
342623	无为县
342624	巢县
342625	含山县
342626	和县
342700	徽州地区
342701	屯溪市
342721	绩溪县
342722	旌德县
342723	歙县
342724	休宁县
342725	黟县
342726	祁门县
342727	太平县
342728	石台县
342800	安庆地区
342821	怀宁县
342822	桐城县
342823	枞阳县
342824	潜山县
342825	太湖县
342826	宿松县
342827	望江县
342828	岳西县
342829	东至县
342830	贵池县
350000	福建省
350100	福州市
350102	鼓楼区
350103	台江区
350104	仓山区
350105	马尾区
350111	郊区
350121	闽侯县
350200	厦门市
350202	鼓浪屿区
350203	思明区
350204	开元区
350205	杏林区
350211	郊区
350221	同安县
352200	建阳地区
352201	南平市
352221	顺昌县
352222	建阳县
352223	建瓯县
352224	浦城县
352225	邵武县
352226	崇安县
352227	光泽县
352228	松溪县
352229	政和县
352300	宁德地区
352321	宁德县
352322	连江县
352323	罗源县
352324	福鼎县
352325	霞浦县
352326	福安县
352327	古田县
352328	屏南县
352329	寿宁县
352330	周宁县
352331	柘荣县
352400	莆田地区
352421	闽清县
352422	永泰县
352423	长乐县
352424	福清县
352425	平潭县
352426	莆田县
352427	仙游县
352500	晋江地区
352501	泉州市
352521	惠安县
352522	晋江县
352523	南安县
352524	安溪县
352525	永春县
352526	德化县
352527	金门县
352600	龙溪地区
352601	漳州市
352621	龙海县
352622	云霄县
352623	漳浦县
352624	诏安县
352625	长泰县
352626	东山县
352627	南靖县
352628	平和县
352629	华安县
352700	龙岩地区
352701	龙岩市
352722	长汀县
352723	永定县
352724	上杭县
352725	武平县
352726	漳平县
352727	连城县
352800	三明地区
352801	三明市
352821	明溪县
352822	永安县
352823	清流县
352824	宁化县
352825	大田县
352826	尤溪县
352827	沙县
352828	将乐县
352829	泰宁县
352830	建宁县
360000	江西省
360100	南昌市
360102	东湖区
360103	西湖区
360104	青云谱区
360105	湾里区
360111	郊区
360121	新建县
360122	南昌县
360200	景德镇市
360202	昌江区
360203	珠山区
360211	鹅湖区
360212	蛟潭区
360300	萍乡市
360302	城关区
360311	上栗区
360312	芦溪区
360313	湘东区
360400	九江市
360402	庐山区
360403	浔阳区
360411	郊区
362100	九江地区
362121	九江县
362122	永修县
362123	彭泽县
362124	德安县
362125	湖口县
362126	瑞昌县
362127	都昌县
362128	武宁县
362129	星子县
362130	修水县
362200	上饶地区
362201	上饶市
362202	鹰潭市
362221	上饶县
362222	贵溪县
362223	婺源县
362224	余江县
362225	德兴县
362226	万年县
362227	玉山县
362228	乐平县
362229	广丰县
362230	波阳县
362231	铅山县
362232	余干县
362233	横峰县
362234	弋阳县
362300	宜春地区
362301	宜春市
362321	宜春县
362322	高安县
362323	万载县
362324	丰城县
362325	铜鼓县
362326	清江县
362327	宜丰县
362328	新余县
362329	上高县
362330	分宜县
362331	安义县
362332	靖安县
362333	奉新县
362400	抚州地区
362401	抚州市
362421	临川县
362422	宜黄县
362423	金溪县
362424	崇仁县
362425	资溪县
362426	乐安县
362427	黎川县
362428	东乡县
362429	南丰县
362430	进贤县
362431	南城县
362500	吉安地区
362501	吉安市
362521	吉安县
362522	万安县
362523	新干县
362524	遂川县
362525	峡江县
362526	宁冈县
362527	吉水县
362528	永新县
362529	永丰县
362530	莲花县
362531	泰和县
362532	安福县
362533	井冈山县
362600	赣州地区
362601	赣州市
362621	广昌县
362622	定南县
362623	石城县
362624	龙南县
362625	宁都县
362626	全南县
362627	兴国县
362628	信丰县
362629	于都县
362630	赣县
362631	瑞金县
362632	南康县
362633	会昌县
362634	上犹县
362635	安远县
362636	崇义县
362637	寻乌县
362638	大余县
370000	山东省
370100	济南市
370102	历下区
370103	市中区
370104	槐荫区
370105	天桥区
370111	郊区
370121	历城县
370122	章丘县
370123	长清县
370200	青岛市
370202	市南区
370203	市北区
370204	台东区
370205	四方区
370206	沧口区
370211	黄岛区
370221	崂山县
370222	即墨县
370223	胶南县
370224	胶县
370300	淄博市
370302	淄川区
370303	张店区
370304	博山区
370305	临淄区
370306	周村区
370400	枣庄市
370402	市中区
370403	薛城区
370404	峄城区
370405	台儿庄区
370406	齐村区
370421	滕县
372100	烟台地区
372101	烟台市
372102	威海市
372121	福山县
372122	蓬莱县
372123	黄县
372124	招远县
372125	掖县
372126	莱西县
372127	莱阳县
372128	栖霞县
372129	海阳县
372130	乳山县
372131	牟平县
372132	文登县
372133	荣成县
372134	长岛县
372200	潍坊地区
372201	潍坊市
372221	益都县
372222	安丘县
372223	寿光县
372224	临朐县
372225	昌乐县
372226	昌邑县
372227	高密县
372228	诸城县
372229	五莲县
372230	平度县
372231	潍县
372300	惠民地区
372321	惠民县
372322	滨县
372323	阳信县
372324	无棣县
372325	沾化县
372326	利津县
372327	广饶县
372328	博兴县
372329	桓台县
372330	邹平县
372331	高青县
372332	垦利县
372400	德州地区
372401	德州市
372421	陵县
372422	平原县
372423	夏津县
372424	武城县
372425	齐河县
372426	禹城县
372427	乐陵县
372428	临邑县
372429	商河县
372430	济阳县
372431	宁津县
372432	庆云县
372500	聊城地区
372521	阳谷县
372522	莘县
372523	茌平县
372524	东阿县
372525	冠县
372526	高唐县
372527	临清县
372528	聊城县
372600	泰安地区
372621	泰安县
372622	莱芜县
372623	新泰县
372624	宁阳县
372625	肥城县
372626	东平县
372627	平阴县
372628	新汶县
372700	济宁地区
372701	济宁市
372721	济宁县
372722	兖州县
372723	曲阜县
372724	泗水县
372725	邹县
372726	微山县
372727	鱼台县
372728	金乡县
372729	嘉祥县
372730	汶上县
372800	临沂地区
372821	临沂县
372822	郯城县
372823	苍山县
372824	莒南县
372825	日照县
372826	莒县
372827	沂水县
372828	沂源县
372829	蒙阴县
372830	平邑县
372831	费县
372832	沂南县
372833	临沭县
372900	菏泽地区
372921	菏泽县
372922	曹县
372923	定陶县
372924	成武县
372925	单县
372926	巨野县
372927	梁山县
372928	郓城县
372929	鄄城县
372930	东明县
410000	河南省
410100	郑州市
410102	中原区
410103	二七区
410104	向阳回族区
410105	金水区
410106	上街区
410111	金海区
410112	郊区
410121	荥阳县
410200	开封市
410202	龙亭区
410203	顺河回族区
410204	古楼区
410205	南关区
410211	郊区
410300	洛阳市
410302	洛北区
410303	西工区
410304	瀍河回族区
410305	涧西区
410311	郊区
410400	平顶山市
410402	新华区
410403	卫东区
410411	郊区
410500	鹤壁市
410502	鹤山区
410503	山城区
410511	郊区
410600	焦作市
410602	解放区
410603	中站区
410604	马村区
410611	郊区
412100	安阳地区
412101	安阳市
412102	文峰区
412103	北关区
412104	铁西区
412111	郊区
412121	林县
412122	安阳县
412123	汤阴县
412124	淇县
412125	浚县
412126	濮阳县
412127	滑县
412128	清丰县
412129	南乐县
412130	内黄县
412131	长垣县
412132	范县
412133	台前县
412200	新乡地区
412201	新乡市
412202	红旗区
412203	新华区
412211	郊区
412221	沁阳县
412222	博爱县
412223	济源县
412224	孟县
412225	温县
412226	武陟县
412227	修武县
412228	获嘉县
412229	新乡县
412230	辉县
412231	汲县
412232	原阳县
412233	延津县
412234	封丘县
412300	商丘地区
412301	商丘市
412321	虞城县
412322	商丘县
412323	民权县
412324	宁陵县
412325	睢县
412326	夏邑县
412327	柘城县
412328	永城县
412400	开封地区
412421	杞县
412422	通许县
412423	尉氏县
412424	开封县
412425	中牟县
412426	新郑县
412427	巩县
412428	登封县
412429	密县
412430	兰考县
412500	洛阳地区
412501	三门峡市
412502	义马市
412521	偃师县
412522	孟津县
412523	新安县
412524	渑池县
412525	陕县
412526	灵宝县
412527	伊川县
412528	汝阳县
412529	嵩县
412530	洛宁县
412531	卢氏县
412532	栾川县
412533	临汝县
412534	宜阳县
412600	许昌地区
412601	许昌市
412602	漯河市
412621	长葛县
412622	禹县
412623	鄢陵县
412624	许昌县
412625	郏县
412626	临颍县
412627	襄城县
412628	宝丰县
412629	郾城县
412630	叶县
412631	鲁山县
412632	舞阳县
412700	周口地区
412701	周口市
412721	扶沟县
412722	西华县
412723	商水县
412724	太康县
412725	鹿邑县
412726	郸城县
412727	淮阳县
412728	沈丘县
412729	项城县
412800	驻马店地区
412801	驻马店市
412821	确山县
412822	泌阳县
412823	遂平县
412824	西平县
412825	上蔡县
412826	汝南县
412827	平舆县
412828	新蔡县
412829	正阳县
412900	南阳地区
412901	南阳市
412921	南召县
412922	方城县
412923	西峡县
412924	南阳县
412925	镇平县
412926	内乡县
412927	淅川县
412928	社旗县
412929	唐河县
412930	邓县
412931	新野县
412932	桐柏县
413000	信阳地区
413001	信阳市
413021	息县
413022	淮滨县
413023	信阳县
413024	潢川县
413025	光山县
413026	固始县
413027	商城县
413028	罗山县
413029	新县
420000	湖北省
420100	武汉市
420102	江岸区
420103	江汉区
420104	硚口区
420105	汉阳区
420106	武昌区
420107	青山区
420111	洪山区
420112	东西湖区
420121	汉阳县
420122	武昌县
420200	黄石市
420202	黄石港区
420203	石灰窑区
420204	下陆区
420205	铁山区
420211	郊区
420221	大冶县
420300	十堰市
420400	沙市市
420500	宜昌市
420600	襄樊市
422100	黄冈地区
422101	鄂城市
422121	黄冈县
422122	新洲县
422123	红安县
422124	麻城县
422125	罗田县
422126	英山县
422127	浠水县
422128	蕲春县
422129	广济县
422130	黄梅县
422131	鄂城县
422200	孝感地区
422221	孝感县
422222	黄陂县
422223	大悟县
422224	应山县
422225	安陆县
422226	云梦县
422227	应城县
422228	汉川县
422300	咸宁地区
422321	咸宁县
422322	嘉鱼县
422323	蒲圻县
422324	通城县
422325	崇阳县
422326	通山县
422327	阳新县
422400	荆州地区
422401	荆门市
422421	江陵县
422422	松滋县
422423	公安县
422424	石首县
422425	监利县
422426	洪湖县
422427	沔阳县
422428	天门县
422429	潜江县
422430	荆门县
422431	钟祥县
422432	京山县
422500	襄阳地区
422501	随州市
422502	老河口市
422521	樊阳县
422522	枣阳县
422523	随县
422524	宜城县
422525	南漳县
422526	光化县
422527	谷城县
422528	保康县
422600	郧阳地区
422621	均县
422622	郧县
422623	郧西县
422624	竹山县
422625	竹溪县
422626	房县
422627	神农架林区
422700	宜昌地区
422721	宜昌县
422722	宜都县
422723	枝江县
422724	当阳县
422725	远安县
422726	兴山县
422727	秭归县
422728	长阳县
422729	五峰县
422800	恩施地区
422801	恩施市
422821	恩施县
422822	建始县
422823	巴东县
422824	利川县
422825	宣恩县
422826	咸丰县
422827	来凤土家族自治县
422828	鹤峰土家族自治县
430000	湖南省
430100	长沙市
430102	城东区
430103	城南区
430104	城西区
430105	城北区
430111	郊区
430121	长沙县
430122	望城县
430200	株洲市
430202	东区
430203	北区
430204	南区
430211	郊区
430221	株洲县
430300	湘潭市
430302	雨湖区
430303	湘江区
430304	岳塘区
430305	板塘区
430311	郊区
430400	衡阳市
430402	江东区
430403	城南区
430404	城北区
430411	郊区
430500	邵阳市
430502	东区
430503	西区
430504	桥头区
430511	郊区
432100	湘潭地区
432121	湘潭县
432122	湘乡县
432123	醴陵县
432124	浏阳县
432125	攸县
432126	茶陵县
432127	酃县
432200	岳阳地区
432201	岳阳市
432222	平江县
432223	湘阴县
432224	汨罗县
432225	临湘县
432226	华容县
432300	益阳地区
432301	益阳市
432321	益阳县
432322	南县
432323	沅江县
432324	宁乡县
432325	桃江县
432326	安化县
432400	常德地区
432401	常德市
432402	津市市
432421	常德县
432422	安乡县
432423	汉寿县
432424	澧县
432425	临澧县
432426	桃源县
432427	石门县
432428	慈利县
432500	涟源地区
432501	娄底市
432502	冷水江市
432521	涟源县
432522	双峰县
432523	邵东县
432524	新化县
432525	新邵县
432600	邵阳地区
432621	邵阳县
432622	隆回县
432623	武冈县
432624	洞口县
432625	新宁县
432626	绥宁县
432627	城步苗族自治县
432700	衡阳地区
432721	衡阳县
432722	衡南县
432723	衡山县
432724	衡东县
432725	常宁县
432726	祁东县
432727	祁阳县
432800	郴州地区
432801	郴州市
432821	郴县
432822	桂阳县
432823	永兴县
432824	宜章县
432825	资兴县
432826	嘉禾县
432827	临武县
432828	汝城县
432829	桂东县
432830	耒阳县
432831	安仁县
432900	零陵地区
432921	零陵县
432922	东安县
432923	道县
432924	宁远县
432925	江永县
432926	江华瑶族自治县
432927	蓝山县
432928	新田县
432929	双牌县
433000	怀化地区
433001	洪江市
433002	怀化市
433021	黔阳县
433022	沅陵县
433023	辰溪县
433024	溆浦县
433025	麻阳县
433026	新晃侗族自治县
433027	芷江县
433028	怀化县
433029	会同县
433030	靖县
433031	通道侗族自治县
433100	湘西土家族苗族自治州
433121	吉首县
433122	泸溪县
433123	凤凰县
433124	花垣县
433125	保靖县
433126	古丈县
433127	永顺县
433128	大庸县
433129	桑植县
433130	龙山县
440000	广东省
440100	广州市
440102	东山区
440103	荔湾区
440104	越秀区
440105	海珠区
440111	郊区
440112	黄埔区
440121	花县
440122	从化县
440123	新丰县
440124	龙门县
440125	增城县
440126	番禺县
440200	韶关市
440221	曲江县
440300	深圳市
440400	珠海市
440500	汕头市
440502	同平区
440503	安平区
440504	公园区
440505	金沙区
440511	郊区
440600	佛山市
440700	江门市
440800	湛江市
440802	赤坎区
440803	霞山区
440811	郊区
440900	茂名市
441000	海口市
441002	新华区
441003	立新区
441004	东方红区
441005	秀英区
442100	海南行政区
442121	琼山县
442122	文昌县
442123	琼海县
442124	万宁县
442125	定安县
442126	屯昌县
442127	澄迈县
442128	临高县
442129	儋县
442200	海南黎族苗族自治州
442221	崖县
442222	东方县
442223	乐东县
442224	琼中县
442225	保亭县
442226	陵水县
442227	白沙县
442228	昌江县
442300	汕头地区
442301	潮州市
442321	潮安县
442322	澄海县
442323	饶平县
442324	南澳县
442325	潮阳县
442326	揭阳县
442327	揭西县
442328	普宁县
442329	惠来县
442330	陆丰县
442331	海丰县
442400	梅县地区
442401	梅州市
442421	梅县
442422	大埔县
442423	丰顺县
442424	五华县
442425	兴宁县
442426	平远县
442427	蕉岭县
442500	惠阳地区
442501	惠州市
442521	惠阳县
442522	紫金县
442523	和平县
442524	连平县
442525	河源县
442526	博罗县
442527	东莞县
442528	惠东县
442529	龙川县
442600	韶关地区
442621	始兴县
442622	南雄县
442623	仁化县
442624	乐昌县
442625	连县
442626	阳山县
442627	英德县
442628	清远县
442629	佛冈县
442630	翁源县
442631	连山壮族瑶族自治县
442632	连南瑶族自治县
442633	乳源瑶族自治县
442700	佛山地区
442721	三水县
442722	南海县
442723	顺德县
442724	中山县
442725	斗门县
442726	新会县
442727	台山县
442728	恩平县
442729	开平县
442731	鹤山县
442732	高明县
442800	肇庆地区
442801	肇庆市
442821	高要县
442822	四会县
442823	广宁县
442824	怀集县
442825	封开县
442826	德庆县
442827	云浮县
442828	新兴县
442829	郁南县
442830	罗定县
442900	湛江地区
442921	阳江县
442922	阳春县
442923	信宜县
442924	高州县
442925	电白县
442926	吴川县
442927	化州县
442928	廉江县
442929	遂溪县
442930	海康县
442931	徐闻县
450000	广西壮族自治区
450100	南宁市
450102	兴宁区
450103	新城区
450104	城北区
450105	江南区
450106	永新区
450200	柳州市
450202	城中区
450203	鱼峰区
450204	柳南区
450205	柳北区
450300	桂林市
450302	秀峰区
450303	叠彩区
450304	象山区
450305	七星区
450321	阳朔县
450400	梧州市
450402	白云区
450403	万秀区
450404	蝶山区
450405	鸳江区
452100	南宁地区
452101	凭祥市
452121	邕宁县
452122	横县
452123	宾阳县
452124	上林县
452125	武鸣县
452126	隆安县
452127	马山县
452128	扶绥县
452129	崇左县
452130	大新县
452131	天等县
452132	宁明县
452133	龙州县
452200	柳州地区
452201	合山市
452221	柳江县
452222	柳城县
452223	鹿寨县
452224	象州县
452225	武宣县
452226	来宾县
452227	融安县
452228	三江侗族自治县
452229	融水苗族自治县
452230	金秀瑶族自治县
452231	忻城县
452300	桂林地区
452321	临桂县
452322	灵川县
452323	全州县
452324	兴安县
452325	永福县
452327	灌阳县
452328	龙胜各族自治县
452329	资源县
452330	平乐县
452331	荔浦县
452332	恭城县
452400	梧州地区
452421	岑溪县
452422	苍梧县
452423	藤县
452424	昭平县
452425	蒙山县
452426	贺县
452427	钟山县
452428	富川县
452500	玉林地区
452521	玉林县
452522	贵县
452523	桂平县
452524	平南县
452525	容县
452526	北流县
452527	陆川县
452528	博白县
452600	百色地区
452621	百色县
452622	田阳县
452623	田东县
452624	平果县
452625	德保县
452626	靖西县
452627	那坡县
452628	凌云县
452629	乐业县
452630	田林县
452631	隆林各族自治县
452632	西林县
452700	河池地区
452721	河池县
452722	宜山县
452723	罗城县
452724	环江县
452725	南丹县
452726	天峨县
452727	凤山县
452728	东兰县
452729	巴马瑶族自治县
452730	都安瑶族自治县
452800	钦州地区
452801	北海市
452821	上思县
452822	防城各族自治县
452823	钦州县
452824	灵山县
452825	合浦县
452826	浦北县
510000	四川省
510100	成都市
510102	东城区
510103	西城区
510111	金牛区
510112	龙泉驿区
510113	青白江区
510121	金堂县
510122	双流县
510200	重庆市
510202	市中区
510203	大渡口区
510211	江北区
510212	沙坪坝区
510213	九龙坡区
510214	南岸区
510215	北碚区
510216	南桐矿区
510217	双桥区
510221	长寿县
510222	巴县
510223	綦江县
510224	江北县
510300	自贡市
510302	自流井区
510303	贡井区
510304	大安区
510311	沿滩区
510321	荣县
510400	渡口市
510402	东区
510403	西区
510411	郊区
510421	米易县
510422	盐边县
512100	温江地区
512121	温江县
512122	郫县
512123	灌县
512124	彭县
512125	什邡县
512126	广汉县
512127	新都县
512128	新津县
512129	蒲江县
512130	邛崃县
512131	大邑县
512132	崇庆县
512200	绵阳地区
512201	绵阳市
512202	市中区
512221	江油县
512222	青川县
512223	平武县
512224	广元县
512225	旺苍县
512226	剑阁县
512227	梓潼县
512228	三台县
512229	盐亭县
512230	射洪县
512231	遂宁县
512232	蓬溪县
512233	中江县
512234	德阳县
512235	绵竹县
512236	安县
512237	北川县
512300	内江地区
512301	内江市
512321	内江县
512322	乐至县
512323	安岳县
512324	威远县
512325	资中县
512326	资阳县
512327	简阳县
512400	宜宾地区
512401	宜宾市
512402	泸州市
512421	宜宾县
512422	富顺县
512423	隆昌县
512424	南溪县
512425	江安县
512426	纳溪县
512427	泸县
512428	合江县
512429	古蔺县
512430	叙永县
512431	长宁县
512432	兴文县
512433	珙县
512434	高县
512435	筠连县
512436	屏山县
512500	乐山地区
512501	乐山市
512521	夹江县
512522	洪雅县
512523	丹棱县
512524	青神县
512525	眉山县
512526	彭山县
512527	井研县
512528	仁寿县
512529	犍为县
512530	沐川县
512531	峨眉县
512532	金口河工农区
512533	峨边县
512534	马边县
512600	永川地区
512621	永川县
512622	大足县
512623	铜梁县
512624	合川县
512625	潼南县
512626	璧山县
512627	江津县
512628	荣昌县
512700	涪陵地区
512721	涪陵县
512722	垫江县
512723	丰都县
512724	石柱县
512725	秀山县
512726	酉阳县
512727	黔江县
512728	彭水县
512729	武隆县
512730	南川县
512800	万县地区
512801	万县市
512821	万县
512822	开县
512823	城口县
512824	巫溪县
512825	巫山县
512826	奉节县
512827	云阳县
512828	忠县
512829	梁平县
512900	南充地区
512901	南充市
512921	南充县
512922	苍溪县
512923	阆中县
512924	仪陇县
512925	南部县
512926	西充县
512927	营山县
512928	蓬安县
512929	广安县
512930	岳池县
512931	武胜县
512932	华云工农区
513000	达县地区
513001	达县市
513021	达县
513022	万源县
513023	宣汉县
513024	开江县
513025	邻水县
513026	大竹县
513027	渠县
513028	南江县
513029	巴中县
513030	平昌县
513031	通江县
513032	白沙工农区
513100	雅安地区
513121	雅安县
513122	芦山县
513123	名山县
513124	荥经县
513125	汉源县
513126	石棉县
513127	天全县
513128	宝兴县
513200	阿坝藏族自治州
513221	马尔康县
513222	红原县
513223	阿坝县
513224	若尔盖县
513225	黑水县
513226	松潘县
513227	南坪县
513228	茂汶羌族自治县
513229	汶川县
513230	理县
513231	小金县
513232	金川县
513233	壤塘县
513300	甘孜藏族自治州
513321	康定县
513322	炉霍县
513323	甘孜县
513324	新龙县
513325	白玉县
513326	德格县
513327	石渠县
513328	色达县
513329	泸定县
513330	丹巴县
513331	九龙县
513332	雅江县
513333	道孚县
513334	理塘县
513335	乡城县
513336	稻城县
513337	巴塘县
513338	得荣县
513400	凉山彝族自治州
513401	西昌市
513421	西昌县
513422	昭觉县
513423	甘洛县
513426	雷波县
513427	宁南县
513428	会东县
513429	会理县
513430	德昌县
513431	美姑县
513432	金阳县
513433	布拖县
513434	普格县
513435	喜德县
513436	越西县
513437	盐源县
513438	木里藏族自治县
513439	冕宁县
520000	贵州省
520100	贵阳市
520102	南明区
520103	云岩区
520111	花溪区
520112	乌当区
520113	白云区
520200	六盘水市
520201	水城特区
520202	盘县特区
520203	六枝特区
522100	遵义地区
522101	遵义市
522121	遵义县
522122	桐梓县
522123	绥阳县
522124	正安县
522125	道真县
522126	务川县
522127	凤冈县
522128	湄潭县
522129	余庆县
522130	仁怀县
522131	赤水县
522132	习水县
522200	铜仁地区
522221	铜仁县
522222	江口县
522223	玉屏县
522224	石阡县
522225	思南县
522226	印江县
522227	德江县
522228	沿河县
522229	松桃苗族自治县
522230	万山特区
522300	黔西南布依族苗族自治州
522321	兴义县
522322	兴仁县
522323	普安县
522324	晴隆县
522325	贞丰县
522326	望谟县
522327	册亨县
522328	安龙县
522400	毕节地区
522421	毕节县
522422	大方县
522423	黔西县
522424	金沙县
522425	织金县
522426	纳雍县
522427	威宁彝族回族苗族自治县
522428	赫章县
522500	安顺地区
522501	安顺市
522521	安顺县
522522	开阳县
522523	息烽县
522524	修文县
522525	清镇县
522526	平坝县
522527	普定县
522528	关岭布依族苗族自治县
522529	镇宁布依族苗族自治县
522530	紫云苗族布依族自治县
522600	黔东南苗族侗族自治州
522621	凯里县
522622	黄平县
522623	施秉县
522624	三穗县
522625	镇远县
522626	岑巩县
522627	天柱县
522628	锦屏县
522629	剑河县
522630	台江县
522631	黎平县
522632	榕江县
522633	从江县
522634	雷山县
522635	麻江县
522636	丹寨县
522700	黔南布依族苗族自治州
522701	都匀市
522721	都匀县
522722	荔波县
522723	贵定县
522724	福泉县
522725	瓮安县
522726	独山县
522727	平塘县
522728	罗甸县
522729	长顺县
522730	龙里县
522731	惠水县
522732	三都水族自治县
530000	云南省
530100	昆明市
530102	五华区
530103	盘龙区
530111	官渡区
530112	西山区
530121	安宁县
530122	呈贡县
530123	富民县
530124	晋宁县
530200	东川市
532100	昭通地区
532101	昭通市
532121	昭通县
532122	鲁甸县
532123	巧家县
532124	盐津县
532125	大关县
532126	永善县
532127	绥江县
532128	镇雄县
532129	彝良县
532130	威信县
532131	水富县
532200	曲靖地区
532221	曲靖县
532222	沾益县
532223	马龙县
532224	宣威县
532225	富源县
532226	罗平县
532227	师宗县
532228	陆良县
532229	宜良县
532230	路南彝族自治县
532231	寻甸回族彝族自治县
532232	嵩明县
532233	会泽县
532300	楚雄彝族自治州
532321	楚雄县
532322	双柏县
532323	牟定县
532324	南华县
532325	姚安县
532326	大姚县
532327	永仁县
532328	元谋县
532329	武定县
532330	禄劝县
532331	禄丰县
532400	玉溪地区
532421	玉溪县
532422	江川县
532423	澄江县
532424	通海县
532425	华宁县
532426	易门县
532427	峨山彝族自治县
532428	新平彝族傣族自治县
532429	元江哈尼族彝族傣族自治县
532500	红河哈尼族彝族自治州
532501	个旧市
532502	开远市
532522	蒙自县
532523	屏边苗族自治县
532524	建水县
532525	石屏县
532526	弥勒县
532527	泸西县
532528	元阳县
532529	红河县
532530	金平县
532531	绿春县
532532	河口瑶族自治县
532600	文山壮族苗族自治州
532621	文山县
532622	砚山县
532623	西畴县
532624	麻栗坡县
532625	马关县
532626	丘北县
532627	广南县
532628	富宁县
532700	思茅地区
532721	思茅县
532722	普洱县
532723	墨江哈尼族自治县
532724	景东县
532725	景谷县
532726	镇沅县
532727	江城哈尼族彝族自治县
532728	孟连傣族拉祜族佤族自治县
532729	澜沧拉祜族自治县
532730	西盟佤族自治县
532800	西双版纳傣族自治州
532821	景洪县
532822	勐海县
532823	勐腊县
532900	大理白族自治州
532901	下关市
532921	大理县
532922	漾濞县
532923	祥云县
532924	宾川县
532925	弥渡县
532926	南涧彝族自治县
532927	巍山彝族回族自治县
532928	永平县
532929	云龙县
532930	洱源县
532931	剑川县
532932	鹤庆县
533000	保山地区
533021	保山县
533022	施甸县
533023	腾冲县
533024	龙陵县
533025	昌宁县
533100	德宏傣族景颇族自治州
533121	潞西县
533122	梁河县
533123	盈江县
533124	陇川县
533125	瑞丽县
533126	畹町镇
533200	丽江地区
533221	丽江纳西族自治县
533222	永胜县
533223	华坪县
533224	宁蒗彝族自治县
533300	怒江傈僳族自治州
533321	碧江县
533322	福贡县
533323	贡山独龙族怒族自治县
533324	泸水县
533325	兰坪县
533400	迪庆藏族自治州
533421	中甸县
533422	德钦县
533423	维西县
533500	临沧地区
533522	凤庆县
533523	云县
533521	临沧县
533524	永德县
533525	镇康县
533526	双江县
533527	耿马傣族佤族自治县
533528	沧源佤族自治县
540000	西藏自治区
540100	拉萨市
540102	城关区
540121	林周县
540122	当雄县
540123	尼木县
540124	曲水县
540125	堆龙德庆县
540126	达孜县
540127	墨竹工卡县
540128	工布江达县
540129	林芝县
540130	米林县
540131	墨脱县
542100	昌都地区
542121	昌都县
542122	江达县
542123	贡觉县
542124	类乌齐县
542125	丁青县
542126	察雅县
542127	八宿县
542128	左贡县
542129	芒康县
542130	波密县
542131	察隅县
542132	洛隆县
542133	边坝县
542200	山南地区
542221	乃东县
542222	扎囊县
542223	贡嘎县
542224	桑日县
542225	穷结县
542226	曲松县
542227	措美县
542228	洛扎县
542229	加查县
542230	朗县
542231	隆子县
542232	错那县
542233	浪卡子县
542300	日喀则地区
542321	日喀则县
542322	南木林县
542323	江孜县
542324	定日县
542325	萨迦县
542326	拉孜县
542327	昂仁县
542328	谢通门县
542329	白朗县
542330	仁布县
542331	康马县
542332	定结县
542333	仲巴县
542334	亚东县
542335	吉隆县
542336	聂拉木县
542337	萨嘎县
542338	岗巴县
542400	那曲地区
542421	那曲县
542422	嘉黎县
542423	比如县
542424	聂荣县
542425	安多县
542426	申扎县
542427	索县
542428	班戈县
542429	巴青县
542500	阿里地区
542521	普兰县
542522	札达县
542523	噶尔县
542524	日土县
542525	革吉县
542526	改则县
542527	措勤县
610000	陕西省
610100	西安市
610102	新城区
610103	碑林区
610104	莲湖区
610111	灞桥区
610112	未央区
610113	雁塔区
610114	阎良区
610121	长安县
610200	铜川市
610202	城区
610203	郊区
610221	耀县
610300	宝鸡市
610302	渭滨区
610303	金台区
610321	宝鸡县
610322	凤翔县
610323	岐山县
610324	扶风县
610325	武功县
610326	眉县
610327	陇县
610328	千阳县
610329	麟游县
610330	凤县
610331	太白县
612100	渭南地区
612121	蓝田县
612122	临潼县
612123	渭南县
612124	华县
612125	华阴县
612126	潼关县
612127	大荔县
612128	蒲城县
612129	澄城县
612130	白水县
612131	韩城县
612132	合阳县
612133	富平县
612200	咸阳地区
612201	咸阳市
612221	兴平县
612222	周至县
612223	户县
612224	三原县
612225	泾阳县
612226	高陵县
612227	乾县
612228	礼泉县
612229	永寿县
612230	彬县
612231	长武县
612232	旬邑县
612233	淳化县
612300	汉中地区
612301	汉中市
612321	南郑县
612322	城固县
612323	洋县
612324	西乡县
612325	勉县
612326	宁强县
612327	略阳县
612328	镇巴县
612329	留坝县
612330	佛坪县
612400	安康地区
612421	安康县
612422	汉阴县
612423	石泉县
612424	宁陕县
612425	紫阳县
612426	岚皋县
612427	平利县
612428	镇坪县
612429	旬阳县
612430	白河县
612500	商洛地区
612521	商县
612522	洛南县
612523	丹凤县
612524	商南县
612525	山阳县
612526	镇安县
612527	柞水县
612600	延安地区
612601	延安市
612621	延长县
612622	延川县
612623	子长县
612624	安塞县
612625	志丹县
612626	吴旗县
612627	甘泉县
612628	富县
612629	洛川县
612630	宜川县
612631	黄龙县
612632	黄陵县
612633	宜君县
612700	榆林地区
612721	榆林县
612722	神木县
612723	府谷县
612724	横山县
612725	靖边县
612726	定边县
612727	绥德县
612728	米脂县
612729	佳县
612730	吴堡县
612731	清涧县
612732	子洲县
620000	甘肃省
620100	兰州市
620102	城关区
620103	七里河区
620104	西固区
620105	安宁区
620111	红古区
620112	白银区
620121	永登县
620122	皋兰县
620123	榆中县
620200	嘉峪关市
620300	金昌市
620321	永昌县
622100	酒泉地区
622101	玉门市
622121	酒泉县
622122	敦煌县
622123	金塔县
622124	肃北蒙古族自治县
622125	阿克塞哈萨克族自治县
622126	安西县
622200	张掖地区
622221	张掖县
622222	肃南裕固族自治县
622223	民乐县
622224	临泽县
622225	高台县
622226	山丹县
622300	武威地区
622321	武威县
622322	民勤县
622323	古浪县
622324	景泰县
622326	天祝藏族自治县
622400	定西地区
622421	定西县
622422	靖远县
622423	会宁县
622424	通渭县
622425	陇西县
622426	渭源县
622427	临洮县
622500	天水地区
622501	天水市
622521	张家川回族自治县
622522	天水县
622523	清水县
622524	徽县
622525	两当县
622526	礼县
622527	西和县
622528	武山县
622529	甘谷县
622530	秦安县
622531	漳县
622600	武都地区
622621	武都县
622622	岷县
622623	宕昌县
622624	成县
622625	康县
622626	文县
622700	平凉地区
622721	平凉县
622722	泾川县
622723	灵台县
622724	崇信县
622725	华亭县
622726	庄浪县
622727	静宁县
622800	庆阳地区
622821	庆阳县
622822	环县
622823	华池县
622824	合水县
622825	正宁县
622826	宁县
622827	镇原县
622900	临夏回族自治州
622921	临夏县
622922	康乐县
622923	永靖县
622924	广河县
622925	和政县
622926	东乡族自治县
622927	积石山保安族东乡族撒拉族自治县
623000	甘南藏族自治州
623021	临潭县
623022	卓尼县
623023	舟曲县
623024	迭部县
623025	玛曲县
623026	碌曲县
623027	夏河县
630000	青海省
630100	西宁市
630102	城东区
630103	城中区
630104	城西区
630111	郊区
630121	大通县
632100	海东地区
632121	平安县
632122	民和县
632123	乐都县
632124	湟中县
632125	湟源县
632126	互助土族自治县
632127	化隆回族自治县
632128	循化撒拉族自治县
632200	海北藏族自治州
632221	门源回族自治县
632222	祁连县
632223	海晏县
632224	刚察县
632300	黄南藏族自治州
632321	同仁县
632322	尖扎县
632323	泽库县
632324	河南蒙古族自治县
632500	海南藏族自治州
632521	共和县
632522	同德县
632523	贵德县
632524	兴海县
632525	贵南县
632600	果洛藏族自治州
632621	玛沁县
632622	班玛县
632623	甘德县
632624	达日县
632625	久治县
632626	玛多县
632700	玉树藏族自治州
632721	玉树县
632722	杂多县
632723	称多县
632724	治多县
632725	囊谦县
632726	曲麻莱县
632800	海西蒙古族藏族自治州
632801	格尔木市
632821	乌兰县
632822	都兰县
632823	天峻县
640000	宁夏回族自治区
640100	银川市
640102	城区
640103	新城区
640104	郊区
640121	永宁县
640122	贺兰县
640200	石咀山市
640202	大武口区
640204	石炭井区
640205	石咀山区
640211	郊区
640221	平罗县
640222	陶乐县
642100	银南地区
642121	吴忠县
642122	青铜峡县
642123	中卫县
642124	中宁县
642125	灵武县
642126	盐池县
642127	同心县
642200	固原地区
642221	固原县
642222	海原县
642223	西吉县
642224	隆德县
642225	泾源县
650000	新疆维吾尔自治区
650100	乌鲁木齐市
650102	天山区
650103	沙依巴克区
650104	新市区
650105	水磨沟区
650106	头屯河区
650107	南山区
650121	乌鲁木齐县
650200	克拉玛依市
650202	独山子区
650300	石河子市
652100	吐鲁番地区
652121	吐鲁番县
652122	鄯善县
652123	托克逊县
652200	哈密地区
652201	哈密市
652221	哈密县
652222	巴里坤哈萨克自治县
652223	伊吾县
652300	昌吉回族自治州
652321	昌吉县
652322	米泉县
652323	呼图壁县
652324	玛纳斯县
652325	奇台县
652326	阜康县
652327	吉木萨尔县
652328	木垒哈萨克自治县
652400	伊犁哈萨克自治州
652401	奎屯市
652402	伊宁市
652403	一区
652404	二区
652421	伊宁县
652422	察布查尔锡伯自治县
652423	霍城县
652424	巩留县
652425	新源县
652426	昭苏县
652427	特克斯县
652428	尼勒克县
652500	塔城地区
652521	塔城县
652522	额敏县
652523	乌苏县
652524	沙湾县
652525	托里县
652526	裕民县
652527	和布克赛尔蒙古自治县
652600	阿勒泰地区
652621	阿勒泰县
652622	布尔津县
652623	富蕴县
652624	福海县
652625	哈巴河县
652626	青河县
652627	吉木乃县
652700	博尔塔拉蒙古自治州
652721	博乐县
652722	精河县
652723	温泉县
652800	巴音郭楞蒙古自治州
652801	库尔勒市
652821	库尔勒县
652822	轮台县
652823	尉犁县
652824	若羌县
652825	且末县
652826	焉耆回族自治县
652827	和静县
652828	和硕县
652829	博湖县
652900	阿克苏地区
652921	阿克苏县
652922	温宿县
652923	库车县
652924	沙雅县
652925	新和县
652926	拜城县
652927	乌什县
652928	阿瓦提县
652929	柯坪县
653000	克孜勒苏柯尔克孜自治州
653021	阿图什县
653022	阿克陶县
653023	阿合奇县
653024	乌恰县
653100	喀什地区
653101	喀什市
653121	疏附县
653122	疏勒县
653123	英吉沙县
653124	泽普县
653125	莎车县
653126	叶城县
653127	麦盖提县
653128	岳普湖县
653129	伽师县
653130	巴楚县
653131	塔什库尔干塔吉克自治县
653200	和田地区
653221	和田县
653222	墨玉县
653223	皮山县
653224	洛浦县
653225	策勒县
653226	于田县
653227	民丰县
`;

    const result= handle(raw);
    fs.writeFileSync('./src/raw/data/GB_T_2260-1981.json', JSON.stringify(result, null, 2), 'utf-8');
    return result;
}
