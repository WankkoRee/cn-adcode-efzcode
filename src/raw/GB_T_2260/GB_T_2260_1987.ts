import * as fs from "fs";
import {handle} from "./GB_T_2260.js";

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
110111	房山区
110221	昌平县
110222	顺义县
110223	通县
110224	大兴县
110226	平谷县
110227	怀柔县
110228	密云县
110229	延庆县
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
120221	宁河县
120222	武清县
120223	静海县
120224	宝坻县
120225	蓟县
130000	河北省
130100	石家庄市
130102	长安区
130103	桥东区
130104	桥西区
130105	新华区
130106	郊区
130107	井陉矿区
130121	井陉县
130122	获鹿县
130123	栾城县
130124	正定县
130200	唐山市
130202	路南区
130203	路北区
130204	东矿区
130205	开平区
130206	新区
130221	丰润县
130222	丰南县
130223	滦县
130224	滦南县
130225	乐亭县
130226	迁安县
130227	迁西县
130228	遵化县
130229	玉田县
130230	唐海县
130300	秦皇岛市
130302	海港区
130303	山海关区
130304	北戴河区
130321	青龙满族自治县
130322	昌黎县
130323	抚宁县
130324	卢龙县
130400	邯郸市
130402	邯山区
130403	丛台区
130404	复兴区
130406	峰峰矿区
130421	邯郸县
130422	武安县
130500	邢台市
130502	桥东区
130503	桥西区
130504	郊区
130521	邢台县
130600	保定市
130602	新市区
130603	北市区
130604	南市区
130621	满城县
130622	清苑县
130700	张家口市
130702	桥东区
130703	桥西区
130704	茶坊区
130705	宣化区
130706	下花园区
130707	庞家堡区
130721	宣化县
130800	承德市
130802	双桥区
130803	双滦区
130804	鹰手营子矿区
130821	承德县
130900	沧州市
130902	新华区
130903	运河区
130904	郊区
130921	沧县
130922	青县
132100	邯郸地区
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
132132	涉县
132133	永年县
132135	馆陶县
132200	邢台地区
132201	南宫市
132202	沙河市
132223	临城县
132224	内丘县
132225	柏乡县
132226	隆尧县
132227	任县
132228	南和县
132229	宁晋县
132231	巨鹿县
132232	新河县
132233	广宗县
132234	平乡县
132235	威县
132236	清河县
132237	临西县
132300	石家庄地区
132301	辛集市
132322	晋县
132323	深泽县
132324	无极县
132325	藁城县
132326	赵县
132329	新乐县
132330	高邑县
132331	元氏县
132332	赞皇县
132335	平山县
132336	灵寿县
132337	行唐县
132400	保定地区
132401	定州市
132402	涿州市
132421	易县
132423	徐水县
132424	涞源县
132425	定兴县
132426	完县
132427	唐县
132428	望都县
132429	涞水县
132432	高阳县
132433	安新县
132434	雄县
132435	容城县
132436	新城县
132437	曲阳县
132438	阜平县
132440	安国县
132441	博野县
132442	蠡县
132500	张家口地区
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
132532	赤城县
132533	崇礼县
132600	承德地区
132622	宽城县
132623	兴隆县
132624	平泉县
132626	滦平县
132627	丰宁满族自治县
132628	隆化县
132629	围场县
132800	廊坊地区
132801	廊坊市
132821	三河县
132822	大厂回族自治县
132823	香河县
132825	永清县
132826	固安县
132827	霸县
132828	文安县
132829	大城县
132900	沧州地区
132902	泊头市
132903	任丘市
132922	河间县
132923	肃宁县
132924	献县
132926	吴桥县
132927	东光县
132928	南皮县
132929	盐山县
132930	黄骅县
132931	孟村回族自治县
132934	海兴县
133000	衡水地区
133001	衡水市
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
140321	平定县
140322	盂县
140400	长治市
140402	城区
140411	郊区
140421	长治县
140422	潞城县
140423	襄垣县
140424	屯留县
140425	平顺县
140426	黎城县
140427	壶关县
140428	长子县
140429	武乡县
140430	沁县
140431	沁源县
140500	晋城市
140502	城区
140503	郊区
140521	沁水县
140522	阳城县
140523	高平县
140524	陵川县
142100	雁北地区
142121	阳高县
142122	天镇县
142123	广灵县
142124	灵丘县
142125	浑源县
142126	应县
142127	山阴县
142128	朔县
142129	平鲁县
142130	左云县
142131	右玉县
142132	大同县
142133	怀仁县
142200	忻州地区
142201	忻州市
142222	定襄县
142223	五台县
142224	原平县
142225	代县
142226	繁峙县
142227	宁武县
142228	静乐县
142229	神池县
142230	五寨县
142231	岢岚县
142232	河曲县
142233	保德县
142234	偏关县
142300	吕梁地区
142321	汾阳县
142322	文水县
142323	交城县
142324	孝义县
142325	兴县
142326	临县
142327	柳林县
142328	石楼县
142329	岚县
142330	方山县
142331	离石县
142332	中阳县
142333	交口县
142400	晋中地区
142401	榆次市
142421	榆社县
142422	左权县
142423	和顺县
142424	昔阳县
142427	寿阳县
142429	太谷县
142430	祁县
142431	平遥县
142432	介休县
142433	灵石县
142600	临汾地区
142601	临汾市
142602	侯马市
142621	曲沃县
142622	翼城县
142623	襄汾县
142625	洪洞县
142626	霍县
142627	古县
142628	安泽县
142629	浮山县
142630	吉县
142631	乡宁县
142632	蒲县
142633	大宁县
142634	永和县
142635	隰县
142636	汾西县
142700	运城地区
142701	运城市
142722	永济县
142723	芮城县
142724	临猗县
142725	万荣县
142726	新绛县
142727	稷山县
142728	河津县
142729	闻喜县
142730	夏县
142731	绛县
142732	平陆县
142733	垣曲县
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
150400	赤峰市
150402	红山区
150403	元宝山区
150404	郊区
150421	阿鲁科尔沁旗
150422	巴林左旗
150423	巴林右旗
150424	林西县
150425	克什克腾旗
150426	翁牛特旗
150428	喀喇沁旗
150429	宁城县
150430	敖汉旗
152100	呼伦贝尔盟
152101	海拉尔市
152102	满洲里市
152103	扎兰屯市
152104	牙克石市
152122	阿荣旗
152123	莫力达瓦达斡尔族自治旗
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
152302	霍林郭勒市
152322	科尔沁左翼中旗
152323	科尔沁左翼后旗
152324	开鲁县
152325	库伦旗
152326	奈曼旗
152327	扎鲁特旗
152500	锡林郭勒盟
152501	二连浩特市
152502	锡林浩特市
152522	阿巴嘎旗
152523	苏尼特左旗
152524	苏尼特右旗
152525	东乌珠穆沁旗
152526	西乌珠穆沁旗
152527	太仆寺旗
152528	镶黄旗
152529	正镶白旗
152530	正蓝旗
152531	多伦县
152600	乌兰察布盟
152601	集宁市
152621	武川县
152622	和林格尔县
152623	清水河县
152624	卓资县
152625	化德县
152626	商都县
152627	兴和县
152628	丰镇县
152629	凉城县
152630	察哈尔右翼前旗
152631	察哈尔右翼中旗
152632	察哈尔右翼后旗
152633	达尔罕茂明安联合旗
152634	四子王旗
152700	伊克昭盟
152701	东胜市
152722	达拉特旗
152723	准格尔旗
152724	鄂托克前旗
152725	鄂托克旗
152726	杭锦旗
152727	乌审旗
152728	伊金霍洛旗
152800	巴彦淖尔盟
152801	临河市
152822	五原县
152823	磴口县
152824	乌拉特前旗
152825	乌拉特中旗
152826	乌拉特后旗
152827	杭锦后旗
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
210213	金州区
210222	新金县
210224	长海县
210225	庄河县
210300	鞍山市
210302	铁东区
210303	铁西区
210304	立山区
210311	旧堡区
210321	台安县
210400	抚顺市
210402	新抚区
210403	露天区
210404	望花区
210411	郊区
210421	抚顺县
210422	新宾满族自治县
210423	清原县
210500	本溪市
210502	平山区
210503	溪湖区
210504	明山区
210505	南芬区
210521	本溪县
210522	桓仁县
210600	丹东市
210602	元宝区
210603	振兴区
210604	振安区
210621	凤城满族自治县
210622	岫岩满族自治县
210623	东沟县
210624	宽甸县
210700	锦州市
210702	古塔区
210703	凌河区
210704	南票区
210705	葫芦岛区
210711	太和区
210723	绥中县
210724	锦县
210725	北镇县
210726	黑山县
210727	义县
210800	营口市
210802	站前区
210803	西市区
210804	鲅鱼圈区
210811	老边区
210821	营口县
210824	盖县
210900	阜新市
210902	海州区
210903	新邱区
210904	太平区
210905	清河门区
210911	细河区
210921	阜新蒙古族自治县
210922	彰武县
211000	辽阳市
211002	白塔区
211003	文圣区
211004	宏伟区
211005	弓长岭区
211011	太子河区
211021	辽阳县
211022	灯塔县
211100	盘锦市
211102	双台子区
211103	兴隆台区
211121	大洼县
211122	盘山县
211200	铁岭市
211202	银州区
211204	清河区
211221	铁岭县
211222	开原县
211223	西丰县
211224	昌图县
211225	康平县
211226	法库县
211300	朝阳市
211302	双塔区
211303	龙城区
211321	朝阳县
211322	建平县
211323	凌源县
211324	喀喇沁左翼蒙古族自治县
211325	建昌县
219001	瓦房店市
219002	海城市
219003	锦西市
219004	兴城市
219005	铁法市
219006	北票市
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
220300	四平市
220302	铁西区
220303	铁东区
220319	公主岭市
220322	梨树县
220323	伊通县
220324	双辽县
220400	辽源市
220402	龙山区
220403	西安区
220421	东丰县
220422	东辽县
220500	通化市
220502	东昌区
220503	二道江区
220519	梅河口市
220521	通化县
220522	集安县
220523	辉南县
220524	柳河县
220600	浑江市
220602	八道江区
220603	三岔子区
220604	临江区
220621	抚松县
220622	靖宇县
220623	长白朝鲜族自治县
222300	白城地区
222301	白城市
222302	洮南市
222303	扶余市
222323	长岭县
222324	前郭尔罗斯蒙古族自治县
222325	大安县
222326	镇赉县
222327	通榆县
222328	乾安县
222400	延边朝鲜族自治州
222401	延吉市
222402	图们市
222403	敦化市
222421	龙井县
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
230121	呼兰县
230200	齐齐哈尔市
230202	龙沙区
230203	建华区
230204	铁锋区
230205	昂昂溪区
230206	富拉尔基区
230207	碾子山区
230208	梅里斯区
230221	龙江县
230222	讷河县
230223	依安县
230224	泰来县
230225	甘南县
230226	杜尔伯特蒙古族自治县
230227	富裕县
230228	林甸县
230229	克山县
230230	克东县
230231	拜泉县
230300	鸡西市
230302	鸡冠区
230303	恒山区
230304	滴道区
230305	梨树区
230306	城子河区
230307	麻山区
230321	鸡东县
230400	鹤岗市
230402	向阳区
230403	工农区
230404	南山区
230405	兴安区
230406	东山区
230407	兴山区
230421	萝北县
230422	绥滨县
230500	双鸭山市
230502	尖山区
230503	岭东区
230505	四方台区
230506	宝山区
230521	集贤县
230600	大庆市
230602	萨尔图区
230603	龙凤区
230604	让胡路区
230605	红岗区
230606	大同区
230700	伊春市
230702	伊春区
230703	南岔区
230704	友好区
230705	西林区
230706	翠峦区
230707	新青区
230708	美溪区
230709	金山屯区
230710	五营区
230711	乌马河区
230712	汤旺河区
230713	带岭区
230714	乌伊岭区
230715	红星区
230716	上甘岭区
230721	铁力县
230722	嘉荫县
230800	佳木斯市
230802	永红区
230803	向阳区
230804	前进区
230805	东风区
230811	郊区
230821	富锦县
230822	桦南县
230823	依兰县
230824	友谊县
230826	桦川县
230827	宝清县
230828	汤原县
230832	饶河县
230833	抚远县
230900	七台河市
230902	新兴区
230903	桃山区
230904	茄子河区
230921	勃利县
231000	牡丹江市
231002	东安区
231003	阳明区
231004	爱民区
231005	西安区
231011	郊区
231021	宁安县
231022	海林县
231023	穆棱县
231024	东宁县
231025	林口县
231026	密山县
231027	虎林县
232100	松花江地区
232122	宾县
232124	双城县
232125	五常县
232126	巴彦县
232127	木兰县
232128	通河县
232129	尚志县
232130	方正县
232131	延寿县
232300	绥化地区
232301	绥化市
232302	安达市
232303	肇东市
232321	海伦县
232324	望奎县
232325	兰西县
232326	青冈县
232328	肇源县
232329	肇州县
232330	庆安县
232331	明水县
232332	绥棱县
232600	黑河地区
232601	黑河市
232602	北安市
232603	五大连池市
232622	嫩江县
232623	德都县
232625	逊克县
232626	孙吴县
232700	大兴安岭地区
232721	呼玛县
232722	塔河县
232723	漠河县
239001	绥芬河市
239002	阿城市
239003	同江市
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
310221	上海县
310222	嘉定县
310223	宝山县
310224	川沙县
310225	南汇县
310226	奉贤县
310227	松江县
310228	金山县
310229	青浦县
310230	崇明县
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
320114	雨花台区
320121	江宁县
320122	江浦县
320123	六合县
320124	溧水县
320125	高淳县
320200	无锡市
320202	崇安区
320203	南长区
320204	北塘区
320205	马山区
320211	郊区
320222	无锡县
320223	宜兴县
320300	徐州市
320302	鼓楼区
320303	云龙区
320304	矿区
320305	贾汪区
320311	郊区
320321	丰县
320322	沛县
320323	铜山县
320324	睢宁县
320325	邳县
320326	新沂县
320400	常州市
320402	天宁区
320404	钟楼区
320405	戚墅堰区
320411	郊区
320421	武进县
320422	金坛县
320423	溧阳县
320500	苏州市
320502	沧浪区
320503	平江区
320504	金阊区
320511	郊区
320522	太仓县
320523	昆山县
320524	吴县
320525	吴江县
320600	南通市
320602	城区
320611	郊区
320621	海安县
320622	如皋县
320623	如东县
320624	南通县
320625	海门县
320626	启东县
320700	连云港市
320703	连云区
320704	云台区
320705	新浦区
320706	海州区
320721	赣榆县
320722	东海县
320723	灌云县
320800	淮阴市
320802	清河区
320811	清浦区
320821	淮阴县
320822	灌南县
320823	沭阳县
320825	泗阳县
320826	涟水县
320827	泗洪县
320829	洪泽县
320830	盱眙县
320831	金湖县
320900	盐城市
320902	城区
320911	郊区
320921	响水县
320922	滨海县
320923	阜宁县
320924	射阳县
320925	建湖县
320926	大丰县
321000	扬州市
321002	广陵区
321011	郊区
321022	高邮县
321023	宝应县
321024	靖江县
321025	泰兴县
321026	江都县
321027	邗江县
321028	泰县
321100	镇江市
321102	京口区
321111	润州区
321121	丹徒县
321123	句容县
321124	扬中县
329001	泰州市
329002	仪征市
329003	常熟市
329004	张家港市
329005	江阴市
329006	宿迁市
329007	丹阳市
329008	东台市
329009	兴化市
329010	淮安市
330000	浙江省
330100	杭州市
330102	上城区
330103	下城区
330104	江干区
330105	拱墅区
330106	西湖区
330107	半山区
330122	桐庐县
330123	富阳县
330124	临安县
330125	余杭县
330126	建德县
330127	淳安县
330200	宁波市
330203	海曙区
330204	江东区
330205	江北区
330206	北仑区
330211	镇海区
330222	慈溪县
330224	奉化县
330225	象山县
330226	宁海县
330227	鄞县
330300	温州市
330302	鹿城区
330303	龙湾区
330321	瓯海县
330322	洞头县
330323	乐清县
330324	永嘉县
330326	平阳县
330327	苍南县
330328	文成县
330329	泰顺县
330400	嘉兴市
330402	城区
330411	郊区
330421	嘉善县
330422	平湖县
330424	海盐县
330425	桐乡县
330500	湖州市
330502	城区
330511	郊区
330521	德清县
330522	长兴县
330523	安吉县
330600	绍兴市
330602	越城区
330621	绍兴县
330622	上虞县
330623	嵊县
330624	新昌县
330625	诸暨县
330700	金华市
330702	婺城区
330721	金华县
330722	永康县
330723	武义县
330724	东阳县
330725	义乌县
330726	浦江县
330727	磐安县
330800	衢州市
330802	柯城区
330821	衢县
330822	常山县
330824	开化县
330825	龙游县
330900	舟山市
330902	定海区
330903	普陀区
330921	岱山县
330922	嵊泗县
332500	丽水地区
332501	丽水市
332522	青田县
332523	云和县
332524	龙泉县
332525	庆元县
332526	缙云县
332527	遂昌县
332528	松阳县
332529	景宁畲族自治县
332600	台州地区
332601	椒江市
332602	临海市
332622	黄岩县
332623	温岭县
332624	仙居县
332625	天台县
332626	三门县
332627	玉环县
339001	余姚市
339002	海宁市
339003	兰溪市
339004	瑞安市
339005	萧山市
339006	江山市
340000	安徽省
340100	合肥市
340102	东市区
340103	中市区
340104	西市区
340111	郊区
340121	长丰县
340122	肥东县
340123	肥西县
340200	芜湖市
340202	镜湖区
340203	马塘区
340204	新芜区
340205	裕溪口区
340206	四褐山区
340211	郊区
340221	芜湖县
340222	繁昌县
340223	南陵县
340224	青阳县
340300	蚌埠市
340302	东市区
340303	中市区
340304	西市区
340311	郊区
340321	怀远县
340322	五河县
340323	固镇县
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
340521	当涂县
340600	淮北市
340602	杜集区
340603	相山区
340604	烈山区
340621	濉溪县
340700	铜陵市
340702	铜官山区
340703	狮子山区
340711	郊区
340721	铜陵县
340800	安庆市
340802	迎江区
340803	大观区
340811	郊区
341000	黄山市
341002	屯溪区
341003	黄山区
341004	徽州区
341021	歙县
341022	休宁县
341023	黟县
341024	祁门县
342100	阜阳地区
342101	阜阳市
342102	亳州市
342121	阜阳县
342122	临泉县
342123	太和县
342124	涡阳县
342125	蒙城县
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
342300	滁县地区
342301	滁州市
342321	天长县
342322	来安县
342324	全椒县
342325	定远县
342326	凤阳县
342327	嘉山县
342400	六安地区
342401	六安市
342421	六安县
342422	寿县
342423	霍邱县
342425	舒城县
342426	金寨县
342427	霍山县
342500	宣城地区
342501	宣城市
342522	郎溪县
342523	广德县
342524	宁国县
342529	泾县
342530	旌德县
342531	绩溪县
342600	巢湖地区
342601	巢湖市
342622	庐江县
342623	无为县
342625	含山县
342626	和县
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
342831	石台县
350000	福建省
350100	福州市
350102	鼓楼区
350103	台江区
350104	仓山区
350105	马尾区
350111	郊区
350121	闽侯县
350122	连江县
350123	罗源县
350124	闽清县
350125	永泰县
350126	长乐县
350127	福清县
350128	平潭县
350200	厦门市
350202	鼓浪屿区
350203	思明区
350204	开元区
350205	杏林区
350206	湖里区
350211	集美区
350221	同安县
350300	莆田市
350302	城厢区
350303	涵江区
350321	莆田县
350322	仙游县
350400	三明市
350402	梅列区
350403	三元区
350421	明溪县
350423	清流县
350424	宁化县
350425	大田县
350426	尤溪县
350427	沙县
350428	将乐县
350429	泰宁县
350430	建宁县
350500	泉州市
350502	鲤城区
350521	惠安县
350522	晋江县
350523	南安县
350524	安溪县
350525	永春县
350526	德化县
350527	金门县
350600	漳州市
350602	芗城区
350621	龙海县
350622	云霄县
350623	漳浦县
350624	诏安县
350625	长泰县
350626	东山县
350627	南靖县
350628	平和县
350629	华安县
352100	建阳地区
352101	南平市
352102	邵武市
352121	顺昌县
352122	建阳县
352123	建瓯县
352124	浦城县
352126	崇安县
352127	光泽县
352128	松溪县
352129	政和县
352200	宁德地区
352221	宁德县
352224	福鼎县
352225	霞浦县
352226	福安县
352227	古田县
352228	屏南县
352229	寿宁县
352230	周宁县
352231	柘荣县
352600	龙岩地区
352601	龙岩市
352622	长汀县
352623	永定县
352624	上杭县
352625	武平县
352626	漳平县
352627	连城县
359001	永安市
359002	石狮市
360000	江西省
360100	南昌市
360102	东湖区
360103	西湖区
360104	青云谱区
360105	湾里区
360111	郊区
360121	南昌县
360122	新建县
360123	安义县
360124	进贤县
360200	景德镇市
360202	昌江区
360203	珠山区
360211	鹅湖区
360212	蛟潭区
360221	乐平县
360300	萍乡市
360302	城关区
360311	上栗区
360312	芦溪区
360313	湘东区
360400	九江市
360402	庐山区
360403	浔阳区
360421	九江县
360422	瑞昌县
360423	武宁县
360424	修水县
360425	永修县
360426	德安县
360427	星子县
360428	都昌县
360429	湖口县
360430	彭泽县
360500	新余市
360502	渝水区
360521	分宜县
360600	鹰潭市
360602	月湖区
360621	贵溪县
360622	余江县
362100	赣州地区
362101	赣州市
362121	赣县
362122	南康县
362123	信丰县
362124	大余县
362125	上犹县
362126	崇义县
362127	安远县
362128	龙南县
362129	定南县
362130	全南县
362131	宁都县
362132	于都县
362133	兴国县
362134	瑞金县
362135	会昌县
362136	寻乌县
362137	石城县
362200	宜春地区
362201	宜春市
362221	丰城县
362222	高安县
362223	清江县
362226	奉新县
362227	万载县
362228	上高县
362229	宜丰县
362232	靖安县
362233	铜鼓县
362300	上饶地区
362301	上饶市
362321	上饶县
362322	广丰县
362323	玉山县
362324	铅山县
362325	横峰县
362326	弋阳县
362329	余干县
362330	波阳县
362331	万年县
362333	德兴县
362334	婺源县
362400	吉安地区
362401	吉安市
362402	井冈山市
362421	吉安县
362422	吉水县
362423	峡江县
362424	新干县
362425	永丰县
362426	泰和县
362427	遂川县
362428	万安县
362429	安福县
362430	永新县
362431	莲花县
362432	宁冈县
362500	抚州地区
362501	临川市
362522	南城县
362523	黎川县
362524	南丰县
362525	崇仁县
362526	乐安县
362527	宜黄县
362528	金溪县
362529	资溪县
362531	东乡县
362532	广昌县
370000	山东省
370100	济南市
370102	历下区
370103	市中区
370104	槐荫区
370105	天桥区
370112	历城区
370122	章丘县
370123	长清县
370124	平阴县
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
370225	莱西县
370226	平度县
370300	淄博市
370302	淄川区
370303	张店区
370304	博山区
370305	临淄区
370306	周村区
370321	桓台县
370400	枣庄市
370402	市中区
370403	薛城区
370404	峄城区
370405	台儿庄区
370406	山亭区
370421	滕县
370500	东营市
370502	东营区
370503	河口区
370521	垦利县
370522	利津县
370523	广饶县
370600	烟台市
370602	芝罘区
370611	福山区
370622	蓬莱县
370624	招远县
370625	掖县
370628	栖霞县
370629	海阳县
370631	牟平县
370634	长岛县
370700	潍坊市
370702	潍城区
370703	寒亭区
370704	坊子区
370722	安丘县
370723	寿光县
370724	临朐县
370725	昌乐县
370726	昌邑县
370727	高密县
370729	五莲县
370800	济宁市
370802	市中区
370811	市郊区
370822	兖州县
370825	邹县
370826	微山县
370827	鱼台县
370828	金乡县
370829	嘉祥县
370830	汶上县
370831	泗水县
370900	泰安市
370902	泰山区
370911	郊区
370921	宁阳县
370922	肥城县
370923	东平县
371000	威海市
371002	环翠区
371021	乳山县
371022	文登县
371023	荣成县
372300	惠民地区
372301	滨州市
372321	惠民县
372323	阳信县
372324	无棣县
372325	沾化县
372328	博兴县
372330	邹平县
372331	高青县
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
372501	聊城市
372502	临清市
372522	阳谷县
372523	莘县
372524	茌平县
372525	东阿县
372526	冠县
372527	高唐县
372800	临沂地区
372801	临沂市
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
372901	菏泽市
372922	曹县
372923	定陶县
372924	成武县
372925	单县
372926	巨野县
372927	梁山县
372928	郓城县
372929	鄄城县
372930	东明县
379001	青州市
379002	龙口市
379003	曲阜市
379004	莱芜市
379005	新泰市
379006	胶州市
379007	诸城市
379008	莱阳市
410000	河南省
410100	郑州市
410102	中原区
410103	二七区
410104	管城回族区
410105	金水区
410106	上街区
410108	邙山区
410121	荥阳县
410122	中牟县
410123	新郑县
410124	巩县
410125	登封县
410126	密县
410200	开封市
410202	龙亭区
410203	顺河回族区
410204	古楼区
410205	南关区
410211	郊区
410221	杞县
410222	通许县
410223	尉氏县
410224	开封县
410225	兰考县
410300	洛阳市
410302	老城区
410303	西工区
410304	瀍河回族区
410305	涧西区
410306	吉利区
410311	郊区
410321	偃师县
410322	孟津县
410323	新安县
410324	栾川县
410325	嵩县
410326	汝阳县
410327	宜阳县
410328	洛宁县
410329	伊川县
410400	平顶山市
410402	新华区
410403	卫东区
410411	郊区
410412	舞钢区
410421	宝丰县
410422	叶县
410423	鲁山县
410424	临汝县
410425	郏县
410426	襄城县
410500	安阳市
410502	文峰区
410503	北关区
410504	铁西区
410511	郊区
410521	林县
410522	安阳县
410523	汤阴县
410526	滑县
410527	内黄县
410600	鹤壁市
410602	鹤山区
410603	山城区
410611	郊区
410621	浚县
410622	淇县
410700	新乡市
410702	红旗区
410703	新华区
410704	北站区
410711	郊区
410721	新乡县
410722	汲县
410723	辉县
410724	获嘉县
410725	原阳县
410726	延津县
410727	封丘县
410728	长垣县
410800	焦作市
410802	解放区
410803	中站区
410804	马村区
410811	郊区
410821	修武县
410822	博爱县
410823	武陟县
410824	沁阳县
410825	温县
410826	孟县
410827	济源县
410900	濮阳市
410902	市区
410922	清丰县
410923	南乐县
410926	范县
410927	台前县
410928	濮阳县
411000	许昌市
411002	魏都区
411021	禹县
411022	长葛县
411023	许昌县
411024	鄢陵县
411100	漯河市
411102	源汇区
411121	舞阳县
411122	临颍县
411123	郾城县
411200	三门峡市
411202	湖滨区
411221	渑池县
411222	陕县
411223	灵宝县
411224	卢氏县
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
419001	义马市
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
420113	汉南区
420121	汉阳县
420122	武昌县
420123	黄陂县
420124	新洲县
420200	黄石市
420202	黄石港区
420203	石灰窑区
420204	下陆区
420205	铁山区
420221	大冶县
420300	十堰市
420302	茅箭区
420303	张湾区
420400	沙市市
420500	宜昌市
420502	西陵区
420503	伍家岗区
420504	点军区
420600	襄樊市
420602	襄城区
420603	樊东区
420604	樊西区
420611	郊区
420621	襄阳县
420622	枣阳县
420623	宜城县
420624	南漳县
420625	谷城县
420626	保康县
420700	鄂州市
420702	梁子湖区
420703	华容区
420704	鄂城区
420800	荆门市
420802	东宝区
420803	沙洋区
422100	黄冈地区
422101	麻城市
422102	武穴市
422121	黄冈县
422123	红安县
422125	罗田县
422126	英山县
422127	浠水县
422128	蕲春县
422130	黄梅县
422200	孝感地区
422201	孝感市
422202	应城市
422203	安陆市
422223	大悟县
422224	应山县
422226	云梦县
422228	汉川县
422300	咸宁地区
422301	咸宁市
422302	蒲圻市
422322	嘉鱼县
422324	通城县
422325	崇阳县
422326	通山县
422327	阳新县
422400	荆州地区
422401	仙桃市
422402	石首市
422403	洪湖市
422404	天门市
422421	江陵县
422422	松滋县
422423	公安县
422425	监利县
422429	潜江县
422431	钟祥县
422432	京山县
422600	郧阳地区
422601	丹江口市
422622	郧县
422623	郧西县
422624	竹山县
422625	竹溪县
422626	房县
422700	宜昌地区
422701	枝城市
422721	宜昌县
422723	枝江县
422724	当阳县
422725	远安县
422726	兴山县
422727	秭归县
422728	长阳土家族自治县
422729	五峰土家族自治县
422800	鄂西土家族苗族自治州
422801	恩施市
422802	利川市
422822	建始县
422823	巴东县
422825	宣恩县
422826	咸丰县
422827	来凤县
422828	鹤峰县
429001	随州市
429002	老河口市
429021	神农架林区
430000	湖南省
430100	长沙市
430102	东区
430103	南区
430104	西区
430105	北区
430111	郊区
430121	长沙县
430122	望城县
430123	浏阳县
430124	宁乡县
430200	株洲市
430202	东区
430203	北区
430204	南区
430211	郊区
430221	株洲县
430223	攸县
430224	茶陵县
430225	酃县
430300	湘潭市
430302	雨湖区
430303	湘江区
430304	岳塘区
430305	板塘区
430311	郊区
430321	湘潭县
430400	衡阳市
430402	江东区
430403	城南区
430404	城北区
430411	郊区
430421	衡阳县
430422	衡南县
430423	衡山县
430424	衡东县
430425	常宁县
430426	祁东县
430500	邵阳市
430502	东区
430503	西区
430511	郊区
430521	邵东县
430522	新邵县
430523	邵阳县
430524	隆回县
430525	洞口县
430526	武冈县
430527	绥宁县
430528	新宁县
430529	城步苗族自治县
430600	岳阳市
430602	南区
430603	北区
430611	郊区
430621	岳阳县
430622	临湘县
430623	华容县
430624	湘阴县
430626	平江县
432300	益阳地区
432301	益阳市
432321	益阳县
432322	南县
432323	沅江县
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
432500	娄底地区
432501	娄底市
432502	冷水江市
432503	涟源市
432522	双峰县
432524	新化县
432800	郴州地区
432801	郴州市
432802	资兴市
432821	郴县
432822	桂阳县
432823	永兴县
432824	宜章县
432826	嘉禾县
432827	临武县
432828	汝城县
432829	桂东县
432831	安仁县
432900	零陵地区
432901	永州市
432902	冷水滩市
432922	东安县
432923	道县
432924	宁远县
432925	江永县
432926	江华瑶族自治县
432927	蓝山县
432928	新田县
432929	双牌县
432930	祁阳县
433000	怀化地区
433001	怀化市
433002	洪江市
433021	黔阳县
433022	沅陵县
433023	辰溪县
433024	溆浦县
433025	麻阳县
433026	新晃侗族自治县
433027	芷江侗族自治县
433029	会同县
433030	靖州苗族侗族自治县
433031	通道侗族自治县
433100	湘西土家族苗族自治州
433101	吉首市
433102	大庸市
433122	泸溪县
433123	凤凰县
433124	花垣县
433125	保靖县
433126	古丈县
433127	永顺县
433129	桑植县
433130	龙山县
439001	醴陵市
439002	湘乡市
439003	耒阳市
439004	汨罗市
440000	广东省
440100	广州市
440102	东山区
440103	荔湾区
440104	越秀区
440105	海珠区
440106	芳村区
440107	天河区
440111	白云区
440112	黄埔区
440121	花县
440122	从化县
440123	新丰县
440124	龙门县
440125	增城县
440126	番禺县
440127	清远县
440128	佛冈县
440200	韶关市
440202	北江区
440203	浈江区
440204	武江区
440221	曲江县
440222	始兴县
440223	南雄县
440224	仁化县
440225	乐昌县
440226	连县
440227	阳山县
440228	英德县
440229	翁源县
440230	连山壮族瑶族自治县
440231	连南瑶族自治县
440232	乳源瑶族自治县
440300	深圳市
440321	宝安县
440400	珠海市
440402	香洲区
440421	斗门县
440500	汕头市
440502	同平区
440503	安平区
440504	公园区
440505	金沙区
440506	达豪区
440511	郊区
440521	澄海县
440522	饶平县
440523	南澳县
440524	潮阳县
440525	揭阳县
440526	揭西县
440527	普宁县
440528	惠来县
440600	佛山市
440602	城区
440603	石湾区
440621	三水县
440622	南海县
440623	顺德县
440624	高明县
440700	江门市
440702	城区
440711	郊区
440721	新会县
440722	台山县
440723	恩平县
440724	开平县
440725	鹤山县
440726	阳江县
440727	阳春县
440800	湛江市
440802	赤坎区
440803	霞山区
440804	坡头区
440811	郊区
440821	吴川县
440822	廉江县
440823	遂溪县
440824	海康县
440825	徐闻县
440900	茂名市
440902	茂南区
440921	信宜县
440922	高州县
440923	电白县
440924	化州县
441000	海口市
441100	三亚市
442100	海南行政区
442102	通什市
442121	琼山县
442122	文昌县
442123	琼海县
442124	万宁县
442125	定安县
442126	屯昌县
442127	澄迈县
442128	临高县
442129	儋县
442130	东方黎族自治县
442131	乐东黎族自治县
442132	琼中黎族苗族自治县
442133	保亭黎族苗族自治县
442134	陵水黎族自治县
442135	白沙黎族自治县
442136	昌江黎族自治县
442400	梅县地区
442401	梅县市
442422	大埔县
442423	丰顺县
442424	五华县
442425	兴宁县
442426	平远县
442427	蕉岭县
442500	惠阳地区
442501	惠州市
442502	东莞市
442521	惠阳县
442522	紫金县
442523	和平县
442524	连平县
442525	河源县
442526	博罗县
442528	惠东县
442529	龙川县
442530	陆丰县
442531	海丰县
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
449001	潮州市
449002	中山市
450000	广西壮族自治区
450100	南宁市
450102	兴宁区
450103	新城区
450104	城北区
450105	江南区
450106	永新区
450107	市郊区
450121	邕宁县
450122	武鸣县
450200	柳州市
450202	城中区
450203	鱼峰区
450204	柳南区
450205	柳北区
450206	市郊区
450221	柳江县
450222	柳城县
450300	桂林市
450302	秀峰区
450303	叠彩区
450304	象山区
450305	七星区
450306	市郊区
450321	阳朔县
450322	临桂县
450400	梧州市
450403	万秀区
450404	蝶山区
450405	市郊区
450421	苍梧县
450500	北海市
450502	海城区
450503	市郊区
450521	合浦县
452100	南宁地区
452101	凭祥市
452122	横县
452123	宾阳县
452124	上林县
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
452423	藤县
452424	昭平县
452425	蒙山县
452426	贺县
452427	钟山县
452428	富川瑶族自治县
452500	玉林地区
452501	玉林市
452522	贵县
452523	桂平县
452524	平南县
452525	容县
452526	北流县
452527	陆川县
452528	博白县
452600	百色地区
452601	百色市
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
452701	河池市
452722	宜山县
452723	罗城仫佬族自治县
452724	环江毛南族自治县
452725	南丹县
452726	天峨县
452727	凤山县
452728	东兰县
452729	巴马瑶族自治县
452730	都安瑶族自治县
452731	大化瑶族自治县
452800	钦州地区
452802	钦州市
452821	上思县
452822	防城各族自治县
452824	灵山县
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
510123	温江县
510124	郫县
510125	新都县
510126	彭县
510127	灌县
510128	崇庆县
510129	大邑县
510130	邛崃县
510131	蒲江县
510132	新津县
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
510225	江津县
510226	合川县
510227	潼南县
510228	铜梁县
510229	永川县
510230	大足县
510231	荣昌县
510232	璧山县
510300	自贡市
510302	自流井区
510303	贡井区
510304	大安区
510311	沿滩区
510321	荣县
510322	富顺县
510400	攀枝花市
510402	东区
510403	西区
510411	仁和区
510421	米易县
510422	盐边县
510500	泸州市
510502	市中区
510521	泸县
510522	合江县
510523	纳溪县
510524	叙永县
510525	古蔺县
510600	德阳市
510602	市中区
510622	绵竹县
510623	中江县
510624	广汉县
510625	什邡县
510700	绵阳市
510702	市中区
510721	江油县
510722	三台县
510723	盐亭县
510724	安县
510725	梓潼县
510726	北川县
510727	平武县
510800	广元市
510802	市中区
510821	旺苍县
510822	青川县
510823	剑阁县
510824	苍溪县
510900	遂宁市
510902	市中区
510921	蓬溪县
510922	射洪县
511000	内江市
511002	市中区
511021	内江县
511022	乐至县
511023	安岳县
511024	威远县
511025	资中县
511026	资阳县
511027	简阳县
511028	隆昌县
511100	乐山市
511102	市中区
511111	沙湾区
511112	五通桥区
511113	金口河区
511121	仁寿县
511122	眉山县
511123	犍为县
511124	井研县
511125	峨眉县
511126	夹江县
511127	洪雅县
511128	彭山县
511129	沐川县
511130	青神县
511131	丹棱县
511132	峨边彝族自治县
511133	马边彝族自治县
512200	万县地区
512201	万县市
512221	万县
512222	开县
512223	忠县
512224	梁平县
512225	云阳县
512226	奉节县
512227	巫山县
512228	巫溪县
512229	城口县
512300	涪陵地区
512301	涪陵市
512322	垫江县
512323	南川县
512324	丰都县
512325	石柱土家族自治县
512326	武隆县
512327	彭水苗族土家族自治县
512328	黔江土家族苗族自治县
512329	酉阳土家族苗族自治县
512330	秀山土家族苗族自治县
512500	宜宾地区
512501	宜宾市
512527	宜宾县
512528	南溪县
512529	江安县
512530	长宁县
512531	高县
512532	筠连县
512533	珙县
512534	兴文县
512535	屏山县
512900	南充地区
512901	南充市
512902	华蓥市
512921	南充县
512922	南部县
512923	岳池县
512924	营山县
512925	广安县
512926	蓬安县
512927	仪陇县
512928	武胜县
512929	西充县
512930	阆中县
513000	达县地区
513001	达县市
513021	达县
513022	宣汉县
513023	开江县
513024	万源县
513025	通江县
513026	南江县
513027	巴中县
513028	平昌县
513029	大竹县
513030	渠县
513031	邻水县
513032	白沙工农区
513100	雅安地区
513101	雅安市
513122	名山县
513123	荥经县
513124	汉源县
513125	石棉县
513126	天全县
513127	芦山县
513128	宝兴县
513200	阿坝藏族羌族自治州
513221	汶川县
513222	理县
513223	茂县
513224	松潘县
513225	南坪县
513226	金川县
513227	小金县
513228	黑水县
513229	马尔康县
513230	壤塘县
513231	阿坝县
513232	若尔盖县
513233	红原县
513300	甘孜藏族自治州
513321	康定县
513322	泸定县
513323	丹巴县
513324	九龙县
513325	雅江县
513326	道孚县
513327	炉霍县
513328	甘孜县
513329	新龙县
513330	德格县
513331	白玉县
513332	石渠县
513333	色达县
513334	理塘县
513335	巴塘县
513336	乡城县
513337	稻城县
513338	得荣县
513400	凉山彝族自治州
513401	西昌市
513422	木里藏族自治县
513423	盐源县
513424	德昌县
513425	会理县
513426	会东县
513427	宁南县
513428	普格县
513429	布拖县
513430	金阳县
513431	昭觉县
513432	喜德县
513433	冕宁县
513434	越西县
513435	甘洛县
513436	美姑县
513437	雷波县
520000	贵州省
520100	贵阳市
520102	南明区
520103	云岩区
520111	花溪区
520112	乌当区
520113	白云区
520200	六盘水市
520201	钟山区
520202	盘县特区
520203	六枝特区
520221	水城县
522100	遵义地区
522101	遵义市
522121	遵义县
522122	桐梓县
522123	绥阳县
522124	正安县
522125	道真仡佬族苗族自治县
522126	务川仡佬族苗族自治县
522127	凤冈县
522128	湄潭县
522129	余庆县
522130	仁怀县
522131	赤水县
522132	习水县
522200	铜仁地区
522201	铜仁市
522222	江口县
522223	玉屏侗族自治县
522224	石阡县
522225	思南县
522226	印江土家族苗族自治县
522227	德江县
522228	沿河土家族自治县
522229	松桃苗族自治县
522230	万山特区
522300	黔西南布依族苗族自治州
522301	兴义市
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
522601	凯里市
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
530121	呈贡县
530122	晋宁县
530123	安宁县
530124	富民县
530125	宜良县
530126	路南彝族自治县
530127	嵩明县
530128	禄劝彝族苗族自治县
530200	东川市
532100	昭通地区
532101	昭通市
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
532201	曲靖市
532223	马龙县
532224	宣威县
532225	富源县
532226	罗平县
532227	师宗县
532228	陆良县
532231	寻甸回族彝族自治县
532233	会泽县
532300	楚雄彝族自治州
532301	楚雄市
532322	双柏县
532323	牟定县
532324	南华县
532325	姚安县
532326	大姚县
532327	永仁县
532328	元谋县
532329	武定县
532331	禄丰县
532400	玉溪地区
532401	玉溪市
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
532530	金平苗族瑶族傣族自治县
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
532722	普洱哈尼族彝族自治县
532723	墨江哈尼族自治县
532724	景东彝族自治县
532725	景谷傣族彝族自治县
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
532901	大理市
532922	漾濞彝族自治县
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
533001	保山市
533022	施甸县
533023	腾冲县
533024	龙陵县
533025	昌宁县
533100	德宏傣族景颇族自治州
533101	畹町市
533121	潞西县
533122	梁河县
533123	盈江县
533124	陇川县
533125	瑞丽县
533200	丽江地区
533221	丽江纳西族自治县
533222	永胜县
533223	华坪县
533224	宁蒗彝族自治县
533300	怒江傈僳族自治州
533321	泸水县
533323	福贡县
533324	贡山独龙族怒族自治县
533325	兰坪白族普米族自治县
533400	迪庆藏族自治州
533421	中甸县
533422	德钦县
533423	维西傈僳族自治县
533500	临沧地区
533521	临沧县
533522	凤庆县
533523	云县
533524	永德县
533525	镇康县
533526	双江拉祜族佤族布朗族傣族自治县
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
542132	洛隆县
542133	边坝县
542134	盐井县
542135	碧土县
542136	妥坝县
542137	生达县
542200	山南地区
542221	乃东县
542222	扎囊县
542223	贡嘎县
542224	桑日县
542225	琼结县
542226	曲松县
542227	措美县
542228	洛扎县
542229	加查县
542231	隆子县
542232	错那县
542233	浪卡子县
542300	日喀则地区
542301	日喀则市
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
542430	尼玛县
542500	阿里地区
542521	普兰县
542522	札达县
542523	噶尔县
542524	日土县
542525	革吉县
542526	改则县
542527	措勤县
542528	隆格尔县
542600	林芝地区
542621	林芝县
542622	工布江达县
542623	米林县
542624	墨脱县
542625	波密县
542626	察隅县
542627	朗县
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
610122	蓝田县
610123	临潼县
610124	周至县
610125	户县
610126	高陵县
610200	铜川市
610202	城区
610203	郊区
610221	耀县
610222	宜君县
610300	宝鸡市
610302	渭滨区
610303	金台区
610321	宝鸡县
610322	凤翔县
610323	岐山县
610324	扶风县
610326	眉县
610327	陇县
610328	千阳县
610329	麟游县
610330	凤县
610331	太白县
610400	咸阳市
610402	秦都区
610403	杨陵区
610404	渭城区
610421	兴平县
610422	三原县
610423	泾阳县
610424	乾县
610425	礼泉县
610426	永寿县
610427	彬县
610428	长武县
610429	旬邑县
610430	淳化县
610431	武功县
612100	渭南地区
612101	渭南市
612102	韩城市
612124	华县
612125	华阴县
612126	潼关县
612127	大荔县
612128	蒲城县
612129	澄城县
612130	白水县
612132	合阳县
612133	富平县
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
620121	永登县
620122	皋兰县
620123	榆中县
620200	嘉峪关市
620300	金昌市
620302	金川区
620321	永昌县
620400	白银市
620402	白银区
620403	平川区
620421	靖远县
620422	会宁县
620423	景泰县
620500	天水市
620502	秦城区
620503	北道区
620521	清水县
620522	秦安县
620523	甘谷县
620524	武山县
620525	张家川回族自治县
622100	酒泉地区
622101	玉门市
622102	酒泉市
622103	敦煌市
622123	金塔县
622124	肃北蒙古族自治县
622125	阿克塞哈萨克族自治县
622126	安西县
622200	张掖地区
622201	张掖市
622222	肃南裕固族自治县
622223	民乐县
622224	临泽县
622225	高台县
622226	山丹县
622300	武威地区
622301	武威市
622322	民勤县
622323	古浪县
622326	天祝藏族自治县
622400	定西地区
622421	定西县
622424	通渭县
622425	陇西县
622426	渭源县
622427	临洮县
622428	漳县
622429	岷县
622600	陇南地区
622621	武都县
622623	宕昌县
622624	成县
622625	康县
622626	文县
622627	西和县
622628	礼县
622629	两当县
622630	徽县
622700	平凉地区
622701	平凉市
622722	泾川县
622723	灵台县
622724	崇信县
622725	华亭县
622726	庄浪县
622727	静宁县
622800	庆阳地区
622801	西峰市
622821	庆阳县
622822	环县
622823	华池县
622824	合水县
622825	正宁县
622826	宁县
622827	镇原县
622900	临夏回族自治州
622901	临夏市
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
630105	城北区
630121	大通回族土族自治县
632100	海东地区
632121	平安县
632122	民和回族土族自治县
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
640200	石嘴山市
640202	大武口区
640204	石炭井区
640205	石嘴山区
640221	平罗县
640222	陶乐县
640223	惠农县
642100	银南地区
642101	吴忠市
642102	青铜峡市
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
642226	彭阳县
650000	新疆维吾尔自治区
650100	乌鲁木齐市
650102	天山区
650103	沙依巴克区
650104	新市区
650105	水磨沟区
650106	头屯河区
650107	南山区
650108	东山区
650121	乌鲁木齐县
650200	克拉玛依市
650202	独山子区
650203	克拉玛依区
650204	白碱滩区
650205	乌尔禾区
652100	吐鲁番地区
652101	吐鲁番市
652122	鄯善县
652123	托克逊县
652200	哈密地区
652201	哈密市
652222	巴里坤哈萨克自治县
652223	伊吾县
652300	昌吉回族自治州
652301	昌吉市
652322	米泉县
652323	呼图壁县
652324	玛纳斯县
652325	奇台县
652326	阜康县
652327	吉木萨尔县
652328	木垒哈萨克自治县
652700	博尔塔拉蒙古自治州
652701	博乐市
652722	精河县
652723	温泉县
652800	巴音郭楞蒙古自治州
652801	库尔勒市
652822	轮台县
652823	尉犁县
652824	若羌县
652825	且末县
652826	焉耆回族自治县
652827	和静县
652828	和硕县
652829	博湖县
652900	阿克苏地区
652901	阿克苏市
652922	温宿县
652923	库车县
652924	沙雅县
652925	新和县
652926	拜城县
652927	乌什县
652928	阿瓦提县
652929	柯坪县
653000	克孜勒苏柯尔克孜自治州
653001	阿图什市
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
653201	和田市
653221	和田县
653222	墨玉县
653223	皮山县
653224	洛浦县
653225	策勒县
653226	于田县
653227	民丰县
654000	伊犁哈萨克自治州
654001	奎屯市
654100	伊犁地区
654101	伊宁市
654121	伊宁县
654122	察布查尔锡伯自治县
654123	霍城县
654124	巩留县
654125	新源县
654126	昭苏县
654127	特克斯县
654128	尼勒克县
654200	塔城地区
654201	塔城市
654221	额敏县
654222	乌苏县
654223	沙湾县
654224	托里县
654225	裕民县
654226	和布克赛尔蒙古自治县
654300	阿勒泰地区
654301	阿勒泰市
654321	布尔津县
654322	富蕴县
654323	福海县
654324	哈巴河县
654325	青河县
654326	吉木乃县
659001	石河子市
`;

    const result= handle(raw);
    fs.writeFileSync('./src/raw/GB_T_2260/data/GB_T 2260-1987.json', JSON.stringify(result, null, 2), 'utf-8');
    return result;
}
